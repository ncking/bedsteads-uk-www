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
limoges,        Limoges                 , £275     , £300      , £400       , £425       , £495       , £525       , £595  
bordeaux,       Bordeaux                , £375     , £400      , £550       , £575       , £625       , £695       , £750      
montpellier,    Montpellier             , £575     , £600      , £850       , £900       , £1000      , £1100      , £1200      
chartres,       Chartres                , £750     , £800      , £1100      , £1150      , £1300      , £1450      , £1550       
paris,          Paris                   , £1150    , £1200     , £1750      , £1800      , £2000      , £2200      , £2400`
  .trim()
  .split('\n')
  .map((line) => {
    return line.split(',').map(k => k.trim())
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
