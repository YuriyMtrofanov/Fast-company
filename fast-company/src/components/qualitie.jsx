import React from "react"

export const Qualitie = (qualitie) => {
    const getQualityClasses = (array) => {
        let classes = 'badge m-1 badge bg-'
        classes += array.color
        return classes
    }

    return (
        <span 
            className = { getQualityClasses(qualitie) }
        >{ qualitie.name }
        </span>
    )
}