// Image box; when there is no photo it shows a faded logo instead of an empty frame.
export default function ImageSlot({ src, alt = '', placeholder = 'Fotografija', className = '' }) {
  return (
    <div className={`img-slot ${className}`} data-placeholder={src ? undefined : placeholder}>
      {src
        ? <img src={src} alt={alt} loading="lazy" ref={el => el?.complete && el.classList.add('loaded')} onLoad={e => e.currentTarget.classList.add('loaded')} />
        : <span className="ph-mark" role="img" aria-label={alt || placeholder}><img src="assets/logo.png" alt="" /></span>}
    </div>
  )
}
