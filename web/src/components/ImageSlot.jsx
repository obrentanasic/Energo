// Image box; when there is no photo it shows a faded logo instead of an empty frame.
// `mobileSrc` swaps in a different (e.g. portrait) photo on phones; `eager` is for above-the-fold heroes.
export default function ImageSlot({ src, mobileSrc, eager = false, alt = '', placeholder = 'Fotografija', className = '' }) {
  const img = src && <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined}
    ref={el => el?.complete && el.classList.add('loaded')} onLoad={e => e.currentTarget.classList.add('loaded')} />
  return (
    <div className={`img-slot ${className}`} data-placeholder={src ? undefined : placeholder}>
      {!src
        ? <span className="ph-mark" role="img" aria-label={alt || placeholder}><img src="assets/logo.png" alt="" /></span>
        : mobileSrc
          ? <picture><source media="(max-width: 759px)" srcSet={mobileSrc} />{img}</picture>
          : img}
    </div>
  )
}
