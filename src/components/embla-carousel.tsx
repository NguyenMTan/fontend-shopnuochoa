import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "@/components/embla-carousel-thumbs-button";
import { Product } from "@/types/product.type";
import thumbNoImage from "@/assets/thumb-no-image.png";

type PropType = {
    product: Product;
    options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { product, options } = props;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
    });

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return;
            emblaMainApi.scrollTo(index);
        },
        [emblaMainApi, emblaThumbsApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        setSelectedIndex(emblaMainApi.selectedScrollSnap());
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaMainApi) return;
        onSelect();

        emblaMainApi.on("select", onSelect).on("reInit", onSelect);
    }, [emblaMainApi, onSelect]);

    return (
        <div className="embla w-[400px]">
            <div className="embla__viewport" ref={emblaMainRef}>
                <div className="embla__container">
                    {product?.images?.map((item, index) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__slide__number">
                                <img
                                    src={item.image_url}
                                    alt="Product Image"
                                    width={300}
                                    height={300}
                                    className="h-[300px]  rounded-xl"
                                />
                            </div>
                        </div>
                    ))}
                    <div className="embla__slide">
                        <div className="embla__slide__number">
                            <img
                                src={
                                    product?.image_url
                                        ? product.image_url
                                        : thumbNoImage
                                }
                                alt="Product Image"
                                width={300}
                                height={300}
                                className="h-[300px] object-cover rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="embla-thumbs">
                <div ref={emblaThumbsRef}>
                    <div className="embla-thumbs__container justify-center">
                        {product?.images?.map((item, index) => (
                            <Thumb
                                key={index}
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                index={index}
                                image={item}
                            />
                        ))}
                        {product.image_url ? (
                            <Thumb
                                onClick={() => onThumbClick(99)}
                                selected={99 === selectedIndex}
                                index={99}
                                image={{
                                    image_id: product.image_id,
                                    image_url: product.image_url,
                                }}
                            />
                        ) : (
                            <Thumb
                                onClick={() => onThumbClick(99)}
                                selected={99 === selectedIndex}
                                index={99}
                                image={{
                                    image_id: "",
                                    image_url: thumbNoImage,
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;
