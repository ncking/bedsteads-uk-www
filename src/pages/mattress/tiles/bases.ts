const tilesMap = {
    base2: {
        slug: 'kelcol',
        details: `
        Hard wood corner blocks
        timber frame + supports
        pad fabric cover
        locating blocks
        `,
        alt: 'Side view photograph of 2&quot; / 4&quot; Hard Top base',
    },
    base4: {
        slug: 'kelcol',
        details: `
        Hard wood corner blocks
        timber frame + supports
        interior coil springs
        fabric cover
        locating blocks
        `,
        alt: 'Side view photograph of 4&quot; / 10cm Sprung base',
    },
    slatted: {
        isBedsteads: true,
        slug: 'bedsteads',
        details: `
        Slatted wooden bases,
        in a variety of woods`,
        alt: 'Side view photograph of wooden Slatted base',
    },
}

export const bases = []

const prices = `    
slatted,    Slatted base                , POA       , POA       , POA        , POA        , POA        , POA        , POA   
base2,          2"/4" Hard top base     , £150     , £170      , £215       , £250       , £290       , £320       , £350      
base4,          4"/10cm Sprung base     , £240     , £270      , £370       , £420       , £480       , £530       , £575   
`
    .trim()
    .split('\n')
    .map((line) => {
        return line.split(',').map((k) => k.trim())
    })

prices.map((linearray) => {
    const [name, title, ...prices] = linearray
    bases.push({ name, title, prices, ...tilesMap[name] })
})
