<template>
    <div class='wrapper'>
        <div id="pop_star" ref='table'>
            <div id="target_score">获胜分数：{{targetScore}}</div>
            <div id="now_score">当前分数：{{totalScore}}</div>
            <div id="select_score" ref='selecScore'></div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                starts:['data:image/png;base64,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',
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAMAAAC7m5rvAAACzVBMVEVHcEyleCJaQCRtUSygeyvboQr899jgoAnknz3/8tmFajOifkLJdSLPlRKXbjKjfifRcx7sqyeYh1LsoC6ceDG4hirOhTSceivGrWG+sZnwtDvnwleveC6yro37+NbLx67LjiG0djXXlju/ejrbwYrQu53d1buWjYPgsVrbq07Z2Zu4ix349c2XdDHOdyj/tg3/tQf8thD/twf8uAv/sgv+txL/tA/+tgn/ogfqpQf+uA3/pgX2rw//qgb0tSb8qwb7uCP4wkL+rw7+7bX3txPmpAf8uAb+vR77vib4qQ36uB3/rgj51mj7rwisgQb9qhH5yFb0z1/+ugX8xyCyfQT41GH/nwTywUX5ugbxti7BhAL7kQP8pQ78yEvvuCD9z0/4nwf95Zv4wBz8zWL6sRP0sCL3qxjzuzf0shf9zVj3qQT5mAXEfhj8uhfylQP9yDLwsQv7pAL61If656f62Hz3sgP876O5gwf4tB37tAn80DL/sxf455j48LXzwir9yz7sjwHyyVD8wDH60UX732PfpRL+lwfxyFzxqhbw0lnvngjy3m3llAn1tw34z1r76prqpBP723H5zmzsrA3997D3vU/6zSfynBX86Y3vwBP/mwnzjQL03H3tz2XimSD99Jv78Yb68pL82z30xTnysjTzxiHbliD+mxT76XvPiQqoiwrtvTn5uC7+9MDxpAz9rB/WmQT734myYQjzpiy2fRv79qbknhX57T2dYgfy13bmwUzogAjnixjx3oz7iAz77GiGVQt8RAb7syr5vDv71VL535b94HrkjyT4ox3SehNsRAGlgw772Z/8znzz1jHv1mCziCrpqB/x5lu1bx7qlS37ygmzhxbr0nKdcx/+4UrBbgXuskP55bDwqQWmUQ77myb+7FncmQv04UvhryzWsEH883qTRwvumBrEoTfKjCj/9tK7sUrv+5yGYwHJpU1DmoinAAAAL3RSTlMA8SQN8ffx8fHxHGfx+37f8O598cfy9PbGxtbnz2fWptbn+KnX1+N+qanjqe2o1hD+TM0AAAlTSURBVEjHbNb5UxppGgdwaqYqu5tUdivZqqk5ao6dvXdT1bQNdAdoUKLcLBJGhRURCRAEFTlLMEEQIt6JB97GO+p6m5h4xPuMq8nk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',
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAMAAAC7m5rvAAABsFBMVEVHcExIrtxCrNsml8nc7/ggfaYhgazf8fklk8UlkMEUT2kYYIBHrtxFrdwhgawba48hgKsuntA7qdosotcihbGCyOdKsN1zwuVWtd9VtN9dt+BTtN8wpNhNsd3T7PdeueHY7vjT7Pckj74ihbIhgq0feaIonNAeeKEondGIyuiq2u+MzOkgfKbK6PWU0OshgKolksMkjLski7kvo9cypdgxpNg0pdgtotcsotc2p9lCrNs3p9k7qdoqodcpoNYondI5p9k+qtpAq9tbt+B3w+VxweQmlMZtvuMnmMpMsN0om89Wtd8nmMtqvuNFrdxhueEonNAnms1nvOJIrtyh1e0pn9RvwOR7xeZRs96CyOen2O4edZy74fImlsgdcpi/4/NKr9223/Gr2u8lkMAedp5Pst55xOWNzOlUs96X0uxjuuGU0Oud1O1HrtyHyuiw3fCj1u10wuVlu+IhgKtZtd+t2+8gfackjLsihLEcbJB+xuZeuOAjiLUfe6QcbpOPzuqKzOmSz+ofeKEbaYwVUGsZZIUkjbzB5PPI5vQSR18YXn0XV3UihbLK6PXa7vgPOUxFft15AAAAM3RSTlMA8fHx8fHx8fHxJA3x8X4cHX7x7sfXxsa43uepZtbvZ9bi19epZ9bjqabj48btpudn7WgrrYKtAAAIb0lEQVRIx2RW93PbRhamc545t9ixc0lm0ufaXC+zi11gsVg0NgAEG9hFyixmE5tEVUvKSLLlItu5+5fvLSw7P9wnDggR+N6+tu/bRCLGZz/8+cfvb9789f/j5kd8//cf//HDg8QvuPvwL/953ev12o8lXr169fg95Hf7Ax6v9lu9V399ePcD685XQFrt91ut7WtUfsF2K0Yf0O6t+vvtr+5cs75ot1rzi3GzPkpeYycFqGUycN2R/4/qgOVs3u9XKqsvYt7dL8fL+vHOOlg4DpNwADa3OeeWxeGO2/GDvGW7yWWz3px+Kf18eB6uQ9djXAFgIoEVVaOGaVK4URGiCB5gQk3cnQRhJmzeTyQefL1VKARdrhFN1xAmmqYRDC9TM50TFjYNjBGK7cHvmh0FW2Hm6weJb11vb8g4rKDENuVTrFJUzekc3jdV5fqJplAVEZ019iblbxPfWE6XWQRRCs5o700jVagD5nZtgZAKniL4wwSpKpgjTsTy3yS+MyF0TUExNA2CMSg1RIemCsxBJlVVgoEGPDAMXwhzjL9L3MhxXYaDwRkM0QFNGIY5cJPJBePVoqCxkygOEG6RoiH6eeJR1rZ0AKRCgyt4SoUh0ka9mZk0hla6SJV4IQguTjIhOjJvJR51wEc9hmXpRJqltJN2x/NMUA4nfkmVYVGFxC/JfFu0eivxSdYC7+IUagRukIGU6kverEx3CsfLjJZTkQJpxhAGlhfwSRW/AhqhEqr8GJA5Q6mmc1vT1fS4frx9HhWFAeGq4KR8RUaoCeNW4tOsBq7Dz5AwioSf9VWzw87a+8tkctyreNQ3BDIoFAVMgglKiOhImq6DNUWyqEKNahVeqbceT6GvZ/ut0IHoYBGoCSTLgD7TsDm4nfg0p+vCFBgDwcBIVTRCa5Ve5XhUX07nrVnBHuSKJjQLWIUuULCGi4N4NUv4Vc0yzKKZKxZL2RIf9/vL0ej4Yjaerc6C0iCX8wWQ4hgVQoppoHU0mwoVmhYeDtJFErnN6WreTB6fzcbJZa8frj3NNLOdrF8s+tBBGJsdmUlNM6qqQhHxyuXmbF5p7fcet86by9l0uZOstOf1VPkkGDLVKA4GHQEVFEWoW46oRV9zT4JCfVbZ7/VWq34frvOL2fS4llru91qz5k7ZDRpelIdIIHmKrFuOmDn/pOAWRmez6Xw+PRufX+y/et3evjgfpZLJ87PzZT0VnriNoRcx25KFl12SwybaPQm8rXoyrNVSMEaS43779c+9cbLebMIsSe1kymHBDYael4fmho1nyubCarR7etKtjY8zo1GtvM7Ux73Xr39un2fqZ8tUmAGE5XB9Ap3tsGJaoyrEdi+HfaJdppOj6bSerG2VR6OwvOy32/1mpgbjq1bLhMCCGbZn8wgdQGgEYruRg43PBlfG+HxeGW0VwlEyU641zy6aOzDxaqn3o6+8td5aKA11s4hNahkxDRuID67EuLKaZdaFsJyRr++EZYkwDDOwIERmkyF6QqkvFBVSci+LOIFyH/wXX1Ras2Rhz11L64Ut+BTkpxxmyu7EEQ7ddEiuihTfj2mIIGGQgys+rvRmtUaj3GwmM67r7rnyEl/dIedik0A7wTb1c7cSNzqKikm1hNjppT3dXzXdSWq6fZY62Zu4QRBM9tyJt8gzL/A3DGARmCBq9nbiRhoh1YTdgq2DS7uyao3c5Lw/TwVBQ7IawZ6X55xNqhsqrQqLI1VnpduJe2lEjKLBsTD0jctg3tpOrZvzccFrQJ2GXnfYiJhl5c0nRPcRDG5DfKRhRY4jQdTnb1KtVd0LMuto4Q0bnud1o4WUDfsgzeX0wuCVjrIxDXHGhSkIVY0Xhf5+mLe7Hs/nF1G0AI7NIi+KslUK00cVwoks/31soBcYKRhhZJ4mpxeFiDsMlMrJL5iuYofl83nHlykgmMIw0Wjpmkauaf6gflEPGLdtnve6DkEac8AGyzORRtSAifieFheAfKApnU5zXOhyi9lKftKINGR1mW5LmgLlpbqUCKDlYLUO/kjDA+V41NUJ5hxBcMzSLMZ1WJsxOWZVqXwU6VSmJPuRpuDDaGfPIZRarGtThKw8+Ig1bjNHzxpUJSBWVIkz+UlWDiMitYjSd5Na14J9yBsFRwjf0LoNB4rDgZ0F9zBIBAXFKUka/C61FIRXHLmFhaXbOo8Ia8S7OW+DYICbtg8TGWigb8QA2iMod0wzhFI63DqJwLSzYIpn7W7a68DRbW5xbtvCB4GU8kk0A1Ly+UsTEguBgWakc2W3y6AHh17n+fNnb66e6m6DydOFzdWYhhHFSjH978Qfj3wTtBfSqCppZd1wosake/jixa7Q8eHbqw3sBgwmlo1MJJ3EGBUHh79N/H7XV3UdluaaPuAFThbD4vM3uzQPmWfW4MXVk6G7IJRYMt2GqnOcPjr6U+IPGweCYNMU1I4GpVQhEM830galRdOoQp+WDt9cvtxKnni0FKs65nr19PBfiQf/fLb7slQqmkLRBpcbB0+flrrcMKWKG/Igwtjh27c/ofQ7IUCRsKKm3x3d/iyRuP9y89lpicrDkXH65umpqXNd0bglJR5SAHk2N99evkhj2JSMi5c/PTu8L49qvznY/Glg2EwXqsewPJdAxjVL17ClS9EGRcxlYV1FcZg4fbZ59Lf4SHnnd4dHu4OSMLNZFbYcKLif7ZRK2U4nnSvlqlBhYYjq/xbgFRgY21acklKsBGtQilRE18VFNzU1pTSVVVQU1wJZZUAiOrqptra2qaymPDm5BigcXVnZXNkkwgVv9PKpR9cBNcZFg0AcGNRVVlbWAUFza2tlCtDIuLq42rrmaHU+bqTWMr+qijIbKysbCLBCaFYwYGNjFmbm5AABZmY1DSMBiHoAjJ4LoCtMOO8AAAAASUVORK5CYII=',
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAMAAAC7m5rvAAABmFBMVEVHcExs0E8rYho0eCBPtDFQuTJDnCnl9t9w0VJSvTNGoCs4gCPi9dw7hiRHoyxGoStHoyxqz0xaxDtmzkdGoCtDmSmd34mR3Htdyz14013c89an4pVbyjpOszBBlyhGoitEnSpVwzVVwzVOszB401191WNs0E94011KqC6H2G9x0VO86a7j9t6E12ul4pJ71GDV8s3c89ZXyTZMry9Hoyxcyjxfyz9eyz5hzEFjzURdyjtayTlizEJXyTZWyDVs0E9VwzVUwDRSvTNYxTZmzUdozkprz02K2nNw0VKW3YBqz0yR23p10lly0lZ+1WRnzkl71GBRujK356iU3H6G2G6I2XBXxjbN78Sf4IqP2nip4pa05qR301w/kie86a7H7byv5Z+a34a/6rGB1miO2nel4pLD7Lc7hSSE12t5016A1WaY3oNMri6s5JtPtTHK7sBNsjBCmCk+jyZGoCu56KtBlShIpSw8jCWi4Y/U8sxJpy03fSJEnSpBlCgqXxkvaxw0dSA9iSap45lEnCpDmikmVhfh9dwfRxT5PEBjAAAANXRSTlMA8SQN8fHx8fHx8RjxHPF+x/F+8R3l18Zmqe+m7ddnqXPWqWfG5sbW12fW49bn42ft1vHt1uOoYrkAAAgXSURBVBgZZcHbb2TZVQfg31p773Mr181VZZfb5enpzsx0BiadiTQTKRNFAkQkEI888s4rD/wpeUv+gYhnJEBCAokIBAOKWrmM0pq+uO1uu32ry6lTdc7Ze6+F3QniId9HeGc8WQ1vrp3H73PwcPDAaI8uxs9L3LG4Zfr7f1W+AQbn+D3TBQa4c94Pu5e1ni4jAALAk78p36QhAGv8Tr7Nt7iTbx/iAu/YiLS23Z9eCkAAj/98gquHJ+XoOe4UAGoAvQ7OgAwbAA8BXE9uUiww+PsrAcE8+OPRW6wo1IyAWxaALzYKVNjzXjsbh9AA7U7uHEbXk396Fgm7f/mqW37jpJESgDJuCVkSk2AbyKKF8wwFc17uz862RyfDf1ia7t43djK/4FXtYAORZRZ1aE3W25JKRyJFEMAwjfpS8t5ist7azg9PSEq3FvIQAoINAihml+edNRhCyrgliTemCSTr1D26NN06pXbbRsfRxjSqRCI1lj86f7yx5BtDQkLCULEwFDzCzerGHI4krE1UEQisEWcsjKHkVT8/y5Y9IYKCVFkdfBSWrVsGY6pZd2GgIAYDHAzIEJJP2rTWzaRbk0QikCqgIIayBnfBHdogRjKJS5wBoG0EqPfzkRs+OIonQwZBjQGRI2ZSQxH5WwYKGADxFhDYw4doMbQZzhr/6ZwIyh7MSSQiy5bgRmDBRfQxRlVjVESRIc4eS7HBfLrzHR8AIVBUtDFGbQUGdG4toBa3SIXY1EjA9/2TR65JyeDpaKc2mcBJK7CkiPBwrMEuYFsLaolFXZ0zi71WWTmz+zVm48qtkmi2mbIkLRJjRCUkDgxEQwbMog4c4nhP1+Un9+rOkwJZMO0ANrram8w4qMY2WnGfqIUCxnmv6QHOgqdjJ+bhwvs1ptelP+j7Zx//QnPUrThHRKxABBl6EGCwvwG3a+ecSazdHQree4ZUBkRNSa++daFCMEQgDaxk26eGHminoaXEQkg+beq685GL6bZeT5tRfRpTWQwuN47ZWjaGQRw1q98YehADH5TRbuOgt0oe5MVuLZVLaGbLvVJ0hKLa3Y+m9uDH+9cQZcKxofdbspVO7tv7xcjnNecVxBFkWaRzrT6ckxxgaaXYJz49QRKFgjlnABnh0eRy9KbBbhNobUww9f64ntTnK3lifHpZ1KuJQG2eZJug0Gkw9H6blt+rr+NwdHalupSqXI515FxbnT6Mmfdxzuc7zah/LeDWuoOFk3jMINQj5CNattOjxaLH+cEUtgAGEPD7WA/D+mjVe3ExOhqgg+ATsREmm/lsffaHL9s675r5oL+typUeXvDldltjddHL/Xi16pY2rNeLQDd/8kRF+ZwBMqaYf2s9czdn6GOFAnq8ufSt3+0c9Far1ZndHXSP8qN2NS1/8DPtGFIYe+Qbt5bi2/859oO9Z/FwnjXttljRKtW61q2IDPD26Ky9XE2Of/hvMYve3Pu1se81/TqrTo/+4F+/OGsP33aag7Az3hx0hsWd4XAYl2Pt7Cy2/fn3f7HJ9i4prU4o+6KEibn6v+D/2tvY3pVBY+DX6Qyn+K3ZKWavarSf/TvbSBEp/YwBTsRMbfzn6tsvnWm0191kbWonpwpmPgQOX7XLX9FOuP8l2xgj4EkZfWldBw1v/0W+97oJsxevMwwI11wycFAyTsowSGfJ0fM4g+wEhlUY++HKWKzyJuNn/PiEu2vvxGSDRa+LjZSN9NdmXWH+nS+RXhgVx2LoFeNWs/WVOtLn558uMH6/qe38ZVieAASEq22TJMkf/XKHKmqjtDU2BGM/XOm9MG4L3zJdHbkFjitpgls3ZiMilRGb5Iafda9DajjhQdbkdGwB0Ft7po2qaG952a1nr1MfdLDhKpeSt+MKQEe8h0ZRs1TTprC4E/Bbkaf7L66lIuiiS52bmBa27YQGQQDHFKLBHWIsmfE7zL+8PkljXhFKHPXFIqZV5ZGiaZbwMVoI7igDiv+jn1T56eurt1EKcb8+2cYUzQCqitRpAjJBoT6CwPh/BBmuXFS21WJKfrOBSWwVa0VqI7FDgAIMD3AOVYABhbG9B4nOhePe0aGzecfG3m5CoVKgAyEVcAsYKCzARCqMBG0eqD+HySOuvk7fWwBlc5IwAPUkRgUAewoZwNwXvMOGzUY89hI3bER7zx591EyKznqnAxSAsIAtBGwBmNEXS5CoElGcnFBvveytkRj6rJt1Z/L84848d1SZojIC5QgXJRnm1iUxaaxX9Q7Y6Crm/dnp/T7qr3z87nT/xdMpVzmwabMqkUAIWjyW/7YSUQvE2Kzm+2X/6mawOH00Lv/DDS96T8vP3/tm/fN+23ixlfHqRDqrYQZn+pPPX0TpJdoU+fisOcTqYTH/1SvYoHsVXp3nO9Nixxxhm6lxRH53Oxyvvzby8sPZ4Y2KxSZOv1nfo8lTqWLmsaGq1RDXJ8VwJ/ty8Pkx31s3ker9R+FHZFr3KeHBaVuLyV7PJm/d0y1VQYtGbVAjUvuzs2Hvg/FX82S1axP67IPN9qs5wXT/dq76PxmVLu42CweO2kEdYVqDSMpsyFDTGsUo1I/zaH9cRgL4oz8tYnwSnaJRYlFjGAoC+gtgcgzJlaYXINBjU2Dzd68FBIB7f312z19OA3bqtEUU2NDJljjHNGB03ZEVcyji8DcFgN5PVgIQbpmd5M8+wObN5BK37gEeDgvgHrBZjHG193Jso/OaLDb/2K4jAMI73SFNntawsAEByBAQ8E7mP/7KE25ZTImWV7jzv7sVkp4CoRn7AAAAAElFTkSuQmCC',
                        'data:image/png;base64,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'],
                squireWith: 50,
                rowNum: 10,
                columnNum: 10,
                squireArr: [],
                choose: [],
                timer: null,
                baseScore: 5,
                stepScore: 10,
                targetScore: 2000,
                totalScore: 0,
                flag: true,
                tempSquire: null
            }
        },
        mounted() {
            let table = this.$refs['table']
            for (let i = 0; i < this.columnNum; i++) {
                this.squireArr[i] = new Array();
                for (let j = 0; j < this.rowNum; j++) {
                    let squire = this.createSquire(Math.floor(Math.random() * 5), i, j)
                    let _this = this
                    squire.onmouseover = function () {
                        _this.mouseover(this)
                    }
                    squire.onmouseout = function () {
                        _this.goBack();
                    }
                    squire.onclick = this.startClick
                    table.appendChild(squire)
                    this.squireArr[i][j] = squire;
                }
            }
            this.refresh();
        },
        methods: {
            //创建星星函数
            createSquire(color, row, column) {
                let squire = document.createElement('div');
                squire.row = row;
                squire.column = column;
                squire.color = color;
                squire.style.width = this.squireWith + 'px';
                squire.style.height = this.squireWith + 'px';
                squire.style.position = "absolute";
                squire.style.display = "inline-block";
                squire.style.boxSizing = "border-box";
                squire.style.borderRadius = "12px";
                return squire
            },
            refresh() {
                //渲染星星函数
                for (let i = 0; i < this.squireArr.length; i++) {
                    for (let j = 0; j < this.squireArr[i].length; j++) {
                        if (this.squireArr[i][j] == null) {
                            continue
                        }
                        let start = this.squireArr[i][j]
                        start.row = i;
                        start.column = j;
                        start.style.transition = 'left 0.3s,bottom 0.3s';
                        start.style.backgroundImage = 'url(' + this.starts[start.color] + ')';
                        start.style.backgroundSize = 'cover';
                        start.style.transform = 'scale(0.95)';
                        start.style.left = j * this.squireWith + 'px';
                        start.style.bottom = i * this.squireWith + 'px';
                    }
                }
            },
            mouseover(start) {
                //鼠标移入星星事件
                if (!this.flag) {
                    this.tempSquire = start
                    return
                }
                this.choose = [];
                this.goBack();
                this.checkLinked(start, this.choose)
                if (this.choose.length <= 1) {
                    this.choose = [];
                    return;
                }
                this.flicker(this.choose)
                this.selectScore()
            },
            startClick() {
                //点击消灭星星
                if (!this.flag || this.choose.length == 0) {
                    return
                }
                this.flag = false;
                this.tempSquire = null;
                let score = 0;
                for (let i = 0; i < this.choose.length; i++) {
                    score += this.baseScore + i * this.stepScore
                }
                this.totalScore += score
                //消灭星星
                let _this = this
                for (let i = 0; i < this.choose.length; i++) {
                    (function (i) {
                        setTimeout(() => {
                            _this.squireArr[_this.choose[i].row][_this.choose[i].column] = null;
                            _this.$refs.table.removeChild(_this.choose[i])
                        }, 100 * i);
                    })(i)
                }
                //移动并且判断是否结束
                setTimeout(() => {
                    _this.move()
                    setTimeout(() => {
                        let is = _this.isFinsh();
                        if (is) {
                            if (_this.totalScore >= _this.targetScore) {
                                alert('恭喜获胜！')
                            } else {
                                alert('游戏失败！')
                            }
                        } else {
                            _this.choose = [];
                            _this.flag = true;
                            _this.mouseover(_this.tempSquire)
                        }
                    }, 300 + _this.choose.length * 100);
                }, this.choose.length * 100);

            },
            goBack() {
                //所有的星星 恢复到原来的 大小
                if (this.timer != null) {
                    clearInterval(this.timer)
                }
                for (let i = 0; i < this.squireArr.length; i++) {
                    for (let j = 0; j < this.squireArr[i].length; j++) {
                        let start = this.squireArr[i][j]
                        if (start == null) {
                            continue
                        }
                        start.style.border = '1px solid #BFEFFF';
                        start.style.transform = 'scale(0.95)'
                    }
                }
            },
            checkLinked(start, arr) {
                //计算相连星星数组
                if (start == null) {
                    return
                }
                arr.push(start)
                //判断左边的小方块需不需要被收录进来  其他同理
                // 不能在第1列 && 当前星星左边存在星星 && 当前星星和左边星星颜色一致 && 当前星星不在选中数组中
                if (start.column > 0 && this.squireArr[start.row][start.column - 1] && start.color == this.squireArr[start.row][start.column - 1].color && arr.indexOf(this.squireArr[start.row][start.column - 1]) == -1) {
                    this.checkLinked(this.squireArr[start.row][start.column - 1], arr)
                }
                if (start.column < this.rowNum - 1 && this.squireArr[start.row][start.column + 1] && start.color == this.squireArr[start.row][start.column + 1].color && arr.indexOf(this.squireArr[start.row][start.column + 1]) == -1) {
                    this.checkLinked(this.squireArr[start.row][start.column + 1], arr)
                }
                if (start.row > 0 && this.squireArr[start.row - 1][start.column] && start.color == this.squireArr[start.row - 1][start.column].color && arr.indexOf(this.squireArr[start.row - 1][start.column]) == -1) {
                    this.checkLinked(this.squireArr[start.row - 1][start.column], arr)
                }
                if (start.row < this.columnNum - 1 && this.squireArr[start.row + 1][start.column] && start.color == this.squireArr[start.row + 1][start.column].color && arr.indexOf(this.squireArr[start.row + 1][start.column]) == -1) {
                    this.checkLinked(this.squireArr[start.row + 1][start.column], arr)
                }
            },
            flicker(arr) {
                //闪烁效果
                let num = 0;
                this.timer = setInterval(() => {
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].style.border = '3px solid #BFEFFF'
                        arr[i].style.transform = `scale(${0.9 + 0.05 * Math.pow(-1, num)})`
                    }
                    num++
                }, 300);
            },
            selectScore() {
                //计算选中的星星总分
                let score = 0;
                let selecScore;
                for (let i = 0; i < this.choose.length; i++) {
                    score += this.baseScore + i * this.stepScore
                }
                if (score <= 0) {
                    return
                }
                selecScore = this.$refs.selecScore;
                selecScore.innerHTML = this.choose.length + "块 " + score + "分";
                selecScore.style.opacity = 1;
                selecScore.style.transition = null;
                setTimeout(() => {
                    selecScore.style.transition = 'opacity 0.5s';
                    selecScore.style.opacity = 0;
                }, 1000);
            },
            move() {
                //纵向移动
                for (var i = 0; i < this.rowNum; i++) {
                    var pointer = 0;       //pointer指向小方块，当遇到null的时候停止
                    for (var j = 0; j < this.columnNum; j++) {
                        if (this.squireArr[j][i] != null) {
                            if (j != pointer) {
                                this.squireArr[pointer][i] = this.squireArr[j][i];
                                this.squireArr[j][i].row = pointer;
                                this.squireArr[j][i] = null;
                            }
                            pointer++;
                        }
                    }
                }
                //横向移动
                for (var i = 0; i < this.squireArr[0].length;) {
                    if (this.squireArr[0][i] == null) {
                        for (var j = 0; j < this.rowNum; j++) {
                            this.squireArr[j].splice(i, 1);
                        }
                        continue;
                    }
                    i++;
                }
                this.refresh();
            },
            isFinsh() {
                //判断游戏是否结束
                if (this.totalScore >= this.targetScore) {
                    return true
                }
                for (let i = 0; i < this.rowNum; i++) {
                    for (let j = 0; j < this.columnNum; j++) {
                        let temp = [];
                        this.checkLinked(this.squireArr[i][j], temp)
                        if (temp.length > 1) {
                            return false
                        }
                    }
                }
                return true
            }
        },
    }
</script>
<style scoped>
    .wrapper{
        background-color: black;
        width: 100%;
        height: 100%;
    }
    #pop_star {
        width: 500px;
        height: 100%;
        background: url("http://www.li1214.xyz/allimages/background.png");
        margin-left: auto;
        margin-right: auto;
        position: relative;
        background-size: cover;
        font-size: 0px;
    }

    #target_score {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: white;
        font-size: 20px;
        position: relative;
    }

    #now_score {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: white;
        font-size: 20px;
        position: relative;
    }

    #select_score {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: white;
        font-size: 20px;
        position: relative;
        opacity: 0;
    }
</style>