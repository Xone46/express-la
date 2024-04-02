export const checkEmpty = (data) => {

    try {


        const aArray = new Array();
        for(let i = 0; i < data.a.length; i++) {
            if(data.a[i]["be"] != false || data.a[i]["fc"] != false || data.a[i]["sa"] != false || data.a[i]["nv"] != false || data.a[i]["so"] != false || data.a[i]["o"] != false) {
                aArray.push(true);
            } else {
                aArray.push(false);
            }
        }

        const bArray = new Array();
        for(let i = 0; i < data.b.length; i++) {
            if(data.b[i]["be"] != false || data.b[i]["fc"] != false || data.b[i]["sa"] != false || data.b[i]["nv"] != false || data.b[i]["so"] != false || data.b[i]["o"] != false) {
                bArray.push(true);
            } else {
                bArray.push(false);
            }
        }

        const cArray = new Array();
        for(let i = 0; i < data.c.length; i++) {
            if(data.c[i]["be"] != false || data.c[i]["fc"] != false || data.c[i]["sa"] != false || data.c[i]["nv"] != false || data.c[i]["so"] != false || data.c[i]["o"] != false) {
                cArray.push(true);
            } else {
                cArray.push(false);
            }
        }

        const dArray = new Array();
        for(let i = 0; i < data.d.length; i++) {
            if(data.d[i]["be"] != false || data.d[i]["fc"] != false || data.d[i]["sa"] != false || data.d[i]["nv"] != false || data.d[i]["so"] != false || data.d[i]["o"] != false) {
                dArray.push(true);
            } else {
                dArray.push(false);
            }
        }


        const eArray = new Array();
        for(let i = 0; i < data.e.length; i++) {
            if(data.e[i]["be"] != false || data.e[i]["fc"] != false || data.e[i]["sa"] != false || data.e[i]["nv"] != false || data.e[i]["so"] != false || data.e[i]["o"] != false) {
                eArray.push(true);
            } else {
                eArray.push(false);
            }
        }

        const fArray = new Array();
        for(let i = 0; i < data.f.length; i++) {
            if(data.f[i]["be"] != false || data.f[i]["fc"] != false || data.f[i]["sa"] != false || data.f[i]["nv"] != false || data.f[i]["so"] != false || data.f[i]["o"] != false) {
                fArray.push(true);
            } else {
                fArray.push(false);
            }
        }

        const gArray = new Array();
        for(let i = 0; i < data.g.length; i++) {
            if(data.g[i]["be"] != false || data.g[i]["fc"] != false || data.g[i]["sa"] != false || data.g[i]["nv"] != false || data.g[i]["so"] != false || data.g[i]["o"] != false) {
                gArray.push(true);
            } else {
                gArray.push(false);
            }
        }

        const hArray = new Array();
        for(let i = 0; i < data.h.length; i++) {
            if(data.h[i]["be"] != false || data.h[i]["fc"] != false || data.h[i]["sa"] != false || data.h[i]["nv"] != false || data.h[i]["so"] != false || data.h[i]["o"] != false) {
                hArray.push(true);
            } else {
                hArray.push(false);
            }
        }

        const iArray = new Array();
        for(let i = 0; i < data.i.length; i++) {
            if(data.i[i]["be"] != false || data.i[i]["fc"] != false || data.i[i]["sa"] != false || data.i[i]["nv"] != false || data.i[i]["so"] != false || data.i[i]["o"] != false) {
                iArray.push(true);
            } else {
                iArray.push(false);
            }
        }

        const jArray = new Array();
        for(let i = 0; i < data.j.length; i++) {
            if(data.j[i]["be"] != false || data.j[i]["fc"] != false || data.j[i]["sa"] != false || data.j[i]["nv"] != false || data.j[i]["so"] != false || data.j[i]["o"] != false) {
                jArray.push(true);
            } else {
                jArray.push(false);
            }
        }

        
        const kArray = new Array();
        for(let i = 0; i < data.k.length; i++) {
            if(data.k[i]["be"] != false || data.k[i]["fc"] != false || data.k[i]["sa"] != false || data.k[i]["nv"] != false || data.k[i]["so"] != false || data.k[i]["o"] != false) {
                kArray.push(true);
            } else {
                kArray.push(false);
            }
        }

        const values = aArray.concat(bArray, cArray, dArray, eArray, fArray, gArray, hArray, iArray, jArray, kArray);
        
        var flagStaus = true;

        for(let y = 0; y < values.length; y++) {
            if(Boolean(values[y]) === false) {
                flagStaus = false
                break;
            }
        }
        return flagStaus;


    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }

}