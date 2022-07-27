import React from 'react';
import {Link} from "react-router-dom";
import {asystyDown, asystyUp, goleDown, goleUp} from "../../api/wynikiApiCalls";
import {useTranslation} from "react-i18next";


function PlayersTableEdit(props) {
    const players = props.data
    const id = props.mecz
    const gdzie = props.gdzie
    let i = 1;
    const {t} = useTranslation();

    function getGoleDown(player) {
        var gole = document.getElementById("i" + player.ID_zawodnik)
        var wynik = document.getElementById("Wynik")

        if(wynik.value !== '--:--') {
            if (gole.innerText > 0) {
                gole.innerText = gole.innerText - 1;

                var wynikH = wynik.value.split(":")[0]
                var wynikA = wynik.value.split(":")[1]
                console.log(wynikH)

                if (gdzie === 'H') {
                    if (wynikH !== 0) {
                        wynikH = wynikH - 1
                    }
                } else {
                    if (wynikA !== 0) {
                        wynikA = wynikA - 1
                    }
                }

                wynik.value = wynikH + ":" + wynikA
                goleDown(id, player.ID_zawodnik);
            }
        }
    }
    function getGoleUp(player) {
        var gole = document.getElementById("i" + player.ID_zawodnik)
        var wynik = document.getElementById("Wynik")

        gole.innerText = parseInt(gole.innerText, 10) + 1

        if(wynik.value !== '--:--'){
            var wynikH = wynik.value.split(":")[0]
            var wynikA = wynik.value.split(":")[1]
            console.log(wynikH)

            if (gdzie === 'H') {
                if(wynikH === '--') {
                    wynikH = 1
                    wynikA = 0
                } else {
                    wynikH = parseInt(wynikH, 10) + 1
                }
            } else {
                if(wynikA === '--') {
                    wynikA = 1
                    wynikH = 0
                } else {
                    wynikA = parseInt(wynikA, 10) + 1
                }
            }

            wynik.value = wynikH + ":" + wynikA
            goleUp(id, player.ID_zawodnik);
        }
    }

    function getAsystaDown(player) {
        var asysta = document.getElementById("asysta" + player.ID_zawodnik)

        if(asysta.innerText > 0) {
            asysta.innerText = asysta.innerText - 1;
            asystyDown(id, player.ID_zawodnik);
        }
    }

    function getAsystyUp(player) {
        var asysta = document.getElementById("asysta" + player.ID_zawodnik)
        asysta.innerText = parseInt(asysta.innerText, 10) + 1;
        console.log(player.ID_zawodnik )
        // var count = 0;
        // players.map(p => (
        //     count += p.Gole
        // ))
        // console.log(count)
        asystyUp(id, player.ID_zawodnik);
    }


    return (
        <>
            <h3>{props.text}</h3>
            <table className="table-list" id="table1">
                <thead>
                <tr>
                    <th>#</th>
                    <th>{t('zawodnicy.fields.Imie')}</th>
                    <th>{t('zawodnicy.fields.Nazwisko')}</th>
                    <th>{t('klub_zawodnik.fields.Numer')}</th>
                    <th>{t('zawodnicy.fields.Pozycja')}</th>
                    <th>{t('wyniki.fields.Gole')}</th>
                    <th>{t('wyniki.fields.Asysty')}</th>
                </tr>
                </thead>
                <tbody>
                {players.map(player => (
                    <tr key={player.ID_zawodnik} id="sddfdsf">
                        <td>{i++}</td>
                        <td>{player.Imie}</td>
                        <td>{player.Nazwisko}</td>
                        <td>{player.Numer}</td>
                        <td>{player.Pozycja}</td>
                        <td>
                            <a type="button" onClick={() => getGoleDown(player)}
                                    id="b-minus" class="button-minus">-
                            </a>

                            <a id={"i" + player.ID_zawodnik}>{player.Gole}</a>

                            <a type="button" onClick={() => getGoleUp(player)}
                                    id="b-plus" className="button-plus">+
                            </a>
                        </td>
                        <td>
                            <a type="button" onClick={() => getAsystaDown(player)}
                               id="b-minus" className="button-minus">-
                            </a>

                            <a id={"asysta" + player.ID_zawodnik}>{player.Asysty}</a>

                            <a type="button" onClick={() => getAsystyUp(player)}
                               id="b-plus" className="button-plus">+
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default PlayersTableEdit