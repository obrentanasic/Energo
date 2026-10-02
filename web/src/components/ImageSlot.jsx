// Image with a captioned grey placeholder when no source is set yet.
export default function ImageSlot({ src, alt = '', placeholder = 'Fotografija', className = '' }) {
  return (
    <div className={`img-slot ${className}`} data-placeholder={src ? undefined : placeholder}>
      {src && <img src={src} alt={alt} loading="lazy" ref={el => el?.complete && el.classList.add('loaded')} onLoad={e => e.currentTarget.classList.add('loaded')} />}
    </div>
  )
}
