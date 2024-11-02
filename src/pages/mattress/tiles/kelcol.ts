const tilesMap = {
    limoges: {
        details: `
        Open coil bonnel spring - available in different tensions
        Framed unit
        Demask fabric option
        Tufted
        Fluted border
        Rebound cotton
        Three layers of luxury filling
        Handles for ease of turning`,
        alt: 'Side view photograph of Limoges mattress',
    },
    bordeaux: {
        details: `
        1000 Pocket spring
        Firm tension spring
        White sumptuous fibre filling
        Demask fabric option
        Tufted
        Fluted border
        Handles for ease of turning
        Ventilators to help mattress breathe`,
        alt: 'Side view photograph of Bordeaux mattress',
    },
    montpellier: {
        details: `1200 Pocket spring
        Firm support
        Four layers of luxury and sumptuous fillings
        Rebound cotton
        Demask Fabric option
        Tufted
        Hand side stitching
        Handles for ease of turning
        Ventilators to help mattress breathe`,
        alt: 'Side view photograph of Montpellier mattress',
    },
    chartres: {
        details: `
        1500 Pocket spring
        Five layers of luxury fillings: Lambswool and cotton
        Demask fabric option
        Tufted
        Double layer of Hand side stitching
        White sumptuous fibre
        Handles for ease of turning
        Ventilators to help mattress breathe`,
        alt: 'Side view photograph of Chartres mattress',
    },
    paris: {
        details: `
        3000 Pocket spring
        Five layers of luxury fillings:
            wool,
            cashmere, 
            I-fibre technology
            Demask fabric option
        Four rows of hand side stitching
        Woollen pom-pom tufting
        Handles for ease of turning
        Ventilators to help mattress breathe`,
        alt: 'Side view photograph of Paris mattress',
    },
}

export const kelcolTiles = []

// alt, details, title, rowsHtml

const prices = `
limoges,        Limoges                 , £295     , £350      , £425       , £475       , £525       , £550       , £625  
bordeaux,       Bordeaux                , £395     , £450      , £550       , £600       , £650       , £725       , £800      
montpellier,    Montpellier             , £600     , £700      , £900       , £950       , £1050      , £1150      , £1250      
chartres,       Chartres                , £795     , £900      , £1195      , £1250      , £1350      , £1500      , £1625       
paris,          Paris                   , £1225    , £1400     , £1850      , £1900      , £2100      , £2325      , £2500`
    .trim()
    .split('\n')
    .map((line) => {
        return line.split(',').map((k) => k.trim())
    })

prices.map((linearray) => {
    const [name, title, ...prices] = linearray
    kelcolTiles.push({
        name,
        title,
        prices,
        ...tilesMap[name],
        slug: 'kelcol',
    })
})
