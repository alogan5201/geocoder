import Skeleton from '@mui/material/Skeleton';
import BlogCard from 'components/BlogCard';
import { useEffect, useRef, useState } from 'react';
const LazyImage = ({   src,  maxWidth, maxHeight,title, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [, setView] = useState('');
  const placeholderRef = useRef(null);

  useEffect(() => {
    // Initiating Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      // Set actual image source && unobserve when intersecting
      if (entries[0].isIntersecting) {
        setView(src);
        observer.unobserve(placeholderRef.current);
      }
    });

    // observe for an placeholder image
    if (placeholderRef && placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }
  }, [src]);

  const onLoad = () => {
  setIsLoading(false);
}

  return (
    <>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width={300}
          height={maxHeight}
          ref={placeholderRef}
          sx={{
            borderRadius: 'lg',
            shadow: 'none',
            width: '100%',
            color: '#23262d',
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            position: 'relative',
            zIndex: '1',
        
            boxShadow:
              '0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)',
          }}
        />
      )}
      <div style={isLoading ? { display: 'none' } : { display: 'block' }}>
        <BlogCard
          maxHeight={maxHeight}
          maxWidth={maxWidth}
            onLoad={onLoad}
            image={src}
  category={{ color: "warning", label: "hub" }}
  title={title}
  action={{
    type: "internal",
    route: route,
  }}
        />
        </div>
   
      {/*    <img
          src={view} // Gets src only when placeholder intersecting
          style={isLoading ? { display: 'none' } : { display: 'block', maxWidth: maxWidth, maxHeight: maxHeight }}
          alt={alt}
          onLoad={() => setIsLoading(false)}
        /> */}
    </>
  );
};
export default LazyImage;
