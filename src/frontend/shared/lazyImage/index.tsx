import {
  LazyLoadImage,
  LazyLoadImageProps,
} from "react-lazy-load-image-component";

interface IShineLazyImageProps extends LazyLoadImageProps {}

function ShineLazyImage(props: IShineLazyImageProps) {
  const { src, alt, ...rest } = props;
  return (
    <LazyLoadImage
      src={src || "/images/shine-logo-bw.svg"}
      onError={(e) => ((e.target as any).src = "/images/shine-logo-bw.svg")}
      alt={alt || "image"}
      {...rest}
    />
  );
}

export { ShineLazyImage };
