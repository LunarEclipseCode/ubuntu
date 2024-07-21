import React from 'react'

export default function BackgroundImage(props) {
    const bg_images = {
        "wall-1": "./images/wallpapers/wall-1.jpg",
        "wall-2": "./images/wallpapers/wall-2.jpg",
        "wall-3": "./images/wallpapers/wall-3.jpg",
        "wall-4": "./images/wallpapers/wall-4.jpg",
        "wall-5": "./images/wallpapers/wall-5.jpg",
        "wall-6": "./images/wallpapers/wall-6.jpg",
        "wall-7": "./images/wallpapers/wall-7.jpg",
        "wall-8": "./images/wallpapers/wall-8.jpg",
    };

    // Set the default wallpaper to "wall-1"
    const defaultImage = "wall-1";
    const image = props.img ? props.img : defaultImage;

    return (
        <div style={{ backgroundImage: `url(${bg_images[image]})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPositionX: "center" }} className="bg-ubuntu-img absolute -z-10 top-0 right-0 overflow-hidden h-full w-full">
        </div>
    )
}
