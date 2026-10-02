#!/usr/bin/env python3
"""Import content from the old energoprojekt.rs WordPress site into web/src/content/data/*.json
and web/public/images/.

    python3 scripts/import_content.py fetch  CRAWL_DIR   # download WP REST dumps (needs plain-HTTP access to the site)
    python3 scripts/import_content.py build  CRAWL_DIR   # dumps -> JSON content + resized images (needs pillow)

The site only answers over http:// (https resets), and rejects requests without a browser User-Agent.
"""
import html, io, json, os, re, sys, time, urllib.parse, urllib.request

BASE = 'http://www.energoprojekt.rs'
API = BASE + '/wp-json/wp/v2/'
UA = {'User-Agent': 'Mozilla/5.0 Chrome/124'}
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'src/content/data')
IMG = os.path.join(ROOT, 'public/images')


def get(url, tries=4):
    url = urllib.parse.quote(url, safe=":/?&=%,@+")
    for i in range(tries):
        try:
            return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()
        except Exception as e:  # noqa: BLE001
            err = e
            time.sleep(2 * (i + 1))
    raise err


def fetch(d):
    os.makedirs(d, exist_ok=True)
    for name, extra in [('categories', ''), ('pages', ''), ('posts', '&_embed=wp:featuredmedia')]:
        out, p = [], 1
        while True:
            chunk = json.loads(get(f'{API}{name}?per_page=100&page={p}{extra}'))
            out += chunk
            if len(chunk) < 100:
                break
            p += 1
        json.dump(out, open(f'{d}/{name}.json', 'w'), ensure_ascii=False)
        print(name, len(out))


# ---------------------------------------------------------------- text helpers
def clean(h):
    h = re.sub(r'<style.*?</style>|<script.*?</script>', '', h, flags=re.S)
    h = re.sub(r'</(p|div|h\d|li|tr)>|<br ?/?>', '\n', h)
    h = re.sub(r'\[/?[a-z_0-9]+[^\]]*\]', '\n', h)
    h = html.unescape(re.sub(r'<[^>]+>', '', h))
    h = re.sub(r'[ \t\xa0]+', ' ', h)
    return re.sub(r'\n\s*\n+', '\n', h).strip()


def lines(h):
    return [l.strip() for l in clean(h).split('\n') if l.strip()]


PROPER = ['Energoprojekt', 'Entel', 'Hidroinženjering', 'Urbanizam', 'Arhitektura', 'Visokogradnja', 'Niskogradnja', 'Industrija',
          'Holding', 'Srbija', 'Srbiji', 'Beograd', 'Beogradu', 'Dubai', 'Dubaiju', 'Dakilija', 'Oman', 'Omana', 'Uganda', 'Ugandi',
          'Katar', 'Kataru', 'Gana', 'Gani', 'Alžir', 'Peru', 'Rusija', 'Evropa', 'Evropske', 'Afrika', 'Crna', 'Gora', 'Crne', 'Gore',
          'Dunav', 'Dunavu', 'Sava', 'Save', 'Drina', 'Drine', 'Moravi', 'Morava', 'Ekovadis', 'Likodra', 'Likodre', 'Đerdap', 'Eps',
          'Eu', 'Iso', 'Linkedin']


def sentence_case(s):
    s = s.strip()
    if s != s.upper():
        return s
    s = s.lower()
    s = re.sub(r'(^|[.!?]\s+|[„"”“]\s*)(\w)', lambda m: m.group(1) + m.group(2).upper(), s)
    for w in PROPER:
        s = re.sub(r'\b' + w.lower() + r'\b', w, s)
    return s


def iso(d):
    return d[:10]


def full_img(u):
    u = u.replace('//wp-content', '/wp-content').replace('uploads//', 'uploads/')
    u = re.sub(r'-\d+x\d+(\.\w+)$', r'\1', u)
    return re.sub(r'^https?://(www\.)?energoprojekt\.rs', BASE, u)


_seen = {}


def save_image(url, name, width, quality=72):
    from PIL import Image
    rel = f'images/{name}.jpg'
    if rel in _seen:
        return _seen[rel]
    path = os.path.join(ROOT, 'public', rel)
    if not os.path.exists(path):
        try:
            im = Image.open(io.BytesIO(get(url))).convert('RGB')
        except Exception as e:  # noqa: BLE001
            print('  image failed', url, e)
            return None
        if im.width > width:
            im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        im.save(path, 'JPEG', quality=quality, optimize=True, progressive=True)
    _seen[rel] = rel
    return rel


def slug_of(p):
    return urllib.parse.unquote(p['slug'])[:70].strip('-')


# ---------------------------------------------------------------- build
SECTORS = {'energetika': 'Energetika', 'visokogradnja': 'Visokogradnja', 'infrastruktura': 'Infrastruktura', 'infra': 'Infrastruktura',
           'infra-2-2': 'Infrastruktura', 'vodoprivreda': 'Vodoprivreda', 'industrija': 'Industrija', 'realestate': 'Real estate',
           'vg-2': 'Visokogradnja', 'vg-3': 'Visokogradnja', 'vg3-2-2': 'Visokogradnja', 'vg5': 'Visokogradnja', 'vg6': 'Visokogradnja'}
REGIONS = {'afrika': 'Afrika', 'evropa': 'Evropa', 'azija': 'Azija', 'srednji-istok': 'Bliski istok', 'juzna-amerika': 'Južna Amerika'}
KEYWORDS = [
    ('Energetika', r'hidroelektran|\bhe\b|termoelektran|\bte\b|dalekovod|trafostanic|elektrana|elektro|solarn|vetro|energet|elektroprenos|rasvet|kablovsk'),
    ('Vodoprivreda', r'vodovod|kanalizac|\bbran[aeu]\b|navodnjav|prečišć|vodosnabd|akumulac|melioraci|skladištenje vode|poplav|kolektor|voda\b|vodu\b'),
    ('Infrastruktura', r'\bput[au]?\b|autoput|\bmost|tunel|železni|aerodrom|saobraćaj|ulic[ae]|obilaznic|infrastruktur'),
    ('Visokogradnja', r'stamben|poslovn|hotel|bolnic|škol[aeu]|objekat|objekt|centar|zgrad|stadion|\bhala\b|stanova|kompleks|ambasad|kvart|muzej|zdravstven'),
    ('Industrija', r'fabrik|industrij|cement|rafinerij|pogon|proizvodn|\bkotl|gorivo|farmaceut'),
]


def infer_sectors(text):
    text = text.lower()
    scores = [(len(re.findall(rx, text)), name) for name, rx in KEYWORDS]
    scores = sorted((x for x in scores if x[0]), key=lambda x: -x[0])
    return [n for _, n in scores[:2]] or ['Ostalo']


EXTRA_REGIONS = {
    'Evropa': ['Srbija', 'Bosna i Hercegovina', 'Crna Gora', 'Rusija', 'Hrvatska', 'Slovenija', 'Makedonija', 'Severna Makedonija', 'Rumunija', 'Bugarska', 'Mađarska', 'Ukrajina', 'Belorusija', 'Island', 'Kosovo', 'Albanija', 'Grčka', 'Turska'],
    'Afrika': ['Uganda', 'Nigerija', 'Alžir', 'Gana', 'Zambija', 'Zimbabve', 'Bocvana', 'Kenija', 'Liberija', 'Libija', 'Gvineja', 'Egipat', 'Maroko', 'Tunis', 'Gabon', 'Zair', 'Namibija', 'Mozambik', 'Tanzanija', 'Sudan', 'Mali', 'Niger', 'Kamerun', 'Etiopija', 'Ruanda'],
    'Bliski istok': ['Katar', 'UAE', 'Ujedinjeni Arapski Emirati', 'Oman', 'Jordan', 'Irak', 'Kuvajt', 'Iran', 'Saudijska Arabija', 'Liban', 'Sirija', 'Bahrein'],
    'Azija': ['Kazahstan', 'Uzbekistan', 'Kina', 'Indija', 'Pakistan', 'Avganistan', 'Mongolija', 'Turkmenistan', 'Kambodža', 'Burma', 'Tajland'],
    'Južna Amerika': ['Peru', 'Panama', 'Venecuela', 'Čile', 'Kolumbija', 'Brazil', 'Ekvador', 'Bolivija'],
}
COUNTRY_REGION = {c.lower(): r for r, cs in EXTRA_REGIONS.items() for c in cs}


def infer_regions(country):
    out = []
    for part in re.split(r'[,/;]| i ', country):
        r = COUNTRY_REGION.get(part.strip().lower())
        if r and r not in out:
            out.append(r)
    return out


LABELS = ['Tehnički podaci', 'Usluga', 'Zemlja', 'Klijent', 'Investitor', 'Status projekta']


def facts(h):
    out = {}
    for m in re.finditer(r'<strong>\s*(' + '|'.join(LABELS) + r')\s*:?\s*</strong>\s*:?\s*([^<]*)', h):
        v = html.unescape(m.group(2)).strip(' \xa0:')
        if v:
            out.setdefault(m.group(1), v)
    return out


def build(d):
    posts = json.load(open(f'{d}/posts.json'))
    pages = {p['slug']: p for p in json.load(open(f'{d}/pages.json'))}
    cats = {c['id']: c['slug'] for c in json.load(open(f'{d}/categories.json'))}
    os.makedirs(DATA, exist_ok=True)
    projects, news, notices = [], [], []

    # media lookup for vc_single_image ids used by news
    need = set()
    for p in posts:
        c = p['content']['rendered']
        if 'Tehnički podaci' not in c and 'Cela vest' not in c:
            need |= set(re.findall(r'vc_single_image image=&#8220;(\d+)', c))
    media = {}
    ids = sorted(need)
    for i in range(0, len(ids), 50):
        for m in json.loads(get(API + 'media?per_page=50&_fields=id,source_url&include=' + ','.join(ids[i:i + 50]))):
            media[str(m['id'])] = m['source_url']

    for p in posts:
        c = p['content']['rendered']
        title = html.unescape(p['title']['rendered']).strip()
        cs = [cats[x] for x in dict.fromkeys(p['categories'])]
        if 'Tehnički podaci' in c:                                  # project reference
            f = facts(c)
            imgs = [full_img(u) for u in re.findall(r'<img[^>]+src="([^"]+/uploads/[^"]+)"', c) if 'pdf.png' not in u]
            imgs = list(dict.fromkeys(imgs))
            sectors = list(dict.fromkeys(SECTORS[x] for x in cs if x in SECTORS)) or infer_sectors(f"{title} {f.get('Usluga', '')} {f.get('Tehnički podaci', '')}")
            regions = list(dict.fromkeys(REGIONS[x] for x in cs if x in REGIONS)) or infer_regions(f.get('Zemlja', ''))
            projects.append({'id': p['id'], 'slug': slug_of(p), 'title': title, 'date': iso(p['date']), 'sectors': sectors, 'regions': regions,
                             'country': f.get('Zemlja', ''), 'client': f.get('Klijent') or f.get('Investitor', ''), 'service': f.get('Usluga', ''),
                             'tech': f.get('Tehnički podaci', ''), 'status': f.get('Status projekta', ''), '_imgs': imgs})
        elif 'Cela vest' in c:                                      # PDF notice
            pdf = re.search(r'href="([^"]+\.pdf)"', c)
            kind = 'Skupština' if re.search(r'skupšt|sednic', title, re.I) else 'Izveštaj' if re.search(r'izveštaj', title, re.I) else 'Saopštenje'
            notices.append({'slug': slug_of(p), 'title': title.replace('ENHL – ', '').replace('ENHL - ', ''), 'date': iso(p['date']), 'kind': kind,
                            'pdf': full_img(pdf.group(1)) if pdf else None})
        else:                                                       # news story
            ls = lines(c)
            if not ls:
                continue
            head = ls[0] if len(ls[0]) <= 220 else None
            body = ls[1:] if head else ls
            if not head:
                head = re.split(r'(?<=[.!?])\s', body[0])[0][:160]
            img = None
            m = re.search(r'vc_single_image image=&#8220;(\d+)', c)
            if m and m.group(1) in media:
                img = full_img(media[m.group(1)])
            elif p.get('_embedded', {}).get('wp:featuredmedia'):
                img = full_img(p['_embedded']['wp:featuredmedia'][0].get('source_url') or '') or None
            body = [b for b in body if not re.fullmatch(r'\d+/\d+', b)]
            news.append({'slug': slug_of(p), 'title': sentence_case(head), 'company': sentence_case(title) if title != title.upper() else title.title().replace('Ad ', 'AD '),
                         'date': iso(p['date']), 'body': body, '_img': img})

    # images
    print('projects', len(projects), 'news', len(news), 'notices', len(notices))
    from concurrent.futures import ThreadPoolExecutor
    jobs = []
    for pr in projects:
        imgs = pr['_imgs']
        if imgs:
            jobs.append((imgs[0], f"projects/{pr['slug']}", 1100))
        jobs += [(u, f"projects/{pr['slug']}-{i}", 760) for i, u in enumerate(imgs[1:3], 1)]
    for n in news:
        if n['_img']:
            jobs.append((n['_img'], f"news/{n['slug']}", 960))
    with ThreadPoolExecutor(8) as ex:
        done = list(ex.map(lambda j: save_image(*j, quality=68), jobs))
    got = {j[1]: r for j, r in zip(jobs, done)}
    for pr in projects:
        imgs = pr.pop('_imgs')
        pr['image'] = got.get(f"projects/{pr['slug']}")
        pr['gallery'] = [got[k] for k in (f"projects/{pr['slug']}-{i}" for i in (1, 2)) if got.get(k)]
    for n in news:
        n['image'] = got.get(f"news/{n['slug']}")
        n.pop('_img')

    # pages
    def page(slug):
        return pages[slug]['content']['rendered']

    ko = lines(page('ko-smo'))
    istorijat = []
    cur = None
    for l in lines(page('kratak-istorijat')):
        if re.fullmatch(r'\d{4}(\s*[–-]\s*\d{4})?', l):
            cur = {'year': l, 'text': []}
            istorijat.append(cur)
        elif cur:
            cur['text'].append(l)

    reports = []
    h = page('investitori')
    for tab in re.split(r'vc_accordion_tab title=&#8220;', h)[1:]:
        year = tab[:4]
        for m in re.finditer(r'<a [^>]*href="([^"]+\.pdf)"[^>]*>(.*?)</a>', tab, re.S):
            t = clean(m.group(2))
            kind = 'Godišnji' if t.startswith(('Godišnji', 'Korigovani godišnji')) else 'Polugodišnji' if t.startswith('Polugodišnji') else 'Kvartalni'
            reports.append({'year': year, 'type': kind, 'title': t, 'pdf': full_img(m.group(1)), 'consolidated': 'onsolidovan' in t})

    board = []
    org = page('organizacija')
    for chunk in re.split(r'<img[^>]+class="[^"]*alignleft[^"]*"', org)[1:]:
        src = re.search(r'src="([^"]+)"', chunk)
        body = re.sub(r'^[^>]*>', '', chunk, count=1)
        txt = lines(body)
        nm = re.match(r'\s*([^<]{3,60}?)\s*</', body) or re.match(r'(?s).*?<strong>([^<]{3,60})</strong>', body[:200])
        name = nm.group(1).strip(' ,.\xa0') if nm else (' '.join(txt[0].split()[:2]) if txt else None)
        if not name or not txt:
            continue
        role = re.search(r'(predsednik Nadzornog odbora|predsednik Odbora direktora|generalni direktor|Izvršn\w+ direktor\w* za [^.,]+|izvršn\w+ direktor\w*|član Nadzornog odbora|pomoćnik ministra privrede)', ' '.join(txt)[:260], re.I)
        board.append({'name': name, 'role': (role.group(1)[0].upper() + role.group(1)[1:]) if role else '', 'bio': txt,
                      'photo': save_image(full_img(src.group(1)), 'people/' + re.sub(r'\W+', '-', name.lower()), 600) if src else None})

    out = {
        'about': {'ko_smo': ko, 'vizija': lines(page('vizija-misija-vrednosti')), 'trzista': lines(page('trzista')), 'istorijat': istorijat,
                  'publikacije': lines(page('publikacije')), 'board': board},
        'services': {'usluge': lines(page('usluge-i-oblasti-delovanja')), 'real_estate': lines(page('real-estate')),
                     'energetika': lines(page('energetika')), 'visokogradnja': lines(page('visokogradnja')),
                     'infrastruktura': lines(page('infrastruktura')), 'vodoprivreda': lines(page('vodoprivreda')), 'industrija': lines(page('industrija'))},
        'contact': lines(page('kontakt')),
        'careers': lines(page('karijera')),
        'sustainability': lines(page('odrzivost')),
    }
    for name, val in [('projects', sorted(projects, key=lambda x: x['date'], reverse=True)), ('news', sorted(news, key=lambda x: x['date'], reverse=True)),
                      ('notices', sorted(notices, key=lambda x: x['date'], reverse=True)), ('reports', reports), ('pages', out)]:
        json.dump(val, open(f'{DATA}/{name}.json', 'w'), ensure_ascii=False, indent=1)
        print('wrote', name)


if __name__ == '__main__':
    {'fetch': fetch, 'build': build}[sys.argv[1]](sys.argv[2])
