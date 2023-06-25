import React from "react"

const Picture = ({images, onInput, setImages}) => {

    return (
        <>
            <h2>העלאת תמונה שלך מאפיינת, מאירוע, עם תחביב, בטיול, כל תמונה משמחת.</h2>
            {!images && <>טוען תמונות...</>}
            {images && images.filter((x) => !x.image).length > 0 && (
                <input
                    type="file"
                    onInput={onInput}
                    accept="image/*"
                    multiple={true}
                />
            )}
            {images
                ?.filter((x) => x.image)
                .map((image) => {
                    function deleteImage() {
                        setImages((images) =>
                            images!.map((i) => (i === image ? { ...image, image: "" } : i))
                        )
                    }
                    return (
                        <div key={image.id}>
                            <img src={image.image} height="50px" />
                            <button onClick={deleteImage}>מחק תמונה</button>
                        </div>
                    )
                })}
            <h2>אם אין לך תמונה, אפשר לבקש מאדם אחר להעלות תמונה שלך ישירות אל הפוסטר.</h2>

        </>
    )
}

export default Picture