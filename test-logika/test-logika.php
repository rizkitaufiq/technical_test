<?php

// Nomer 1
function countSockPairs($socks)
{
    $sockCount = [];
    $pairs = 0;

    foreach ($socks as $sock) {
        if (!isset($sockCount[$sock])) {
            $sockCount[$sock] = 0;
        }
        $sockCount[$sock]++;
    }

    foreach ($sockCount as $count) {
        $pairs += floor($count / 2);
    }

    return $pairs;
}

echo "Nomer 1 <br>";
echo "a. " . countSockPairs([10, 20, 20, 10, 10, 30, 50, 10, 20]) . "<br>";
echo "b. " . countSockPairs([6, 5, 2, 3, 5, 2, 2, 1, 1, 5, 1, 3, 3, 3, 5]) . "<br>";
echo "c. " . countSockPairs([1, 1, 3, 1, 2, 1, 3, 3, 3, 3]) . "<br>";
echo "<br>";

// Nomer 2
function countValidWords($sentence)
{
    $words = preg_split('/[\s,.!?]+/', $sentence, -1, PREG_SPLIT_NO_EMPTY);
    $validCount = 0;

    foreach ($words as $word) {
        if (!preg_match('/[^a-zA-Z0-9]/', $word)) {
            $validCount++;
        }
    }

    return $validCount;
}


echo "Nomer 2 <br>";
echo "a. " . countValidWords("Saat meng*ecat tembok, Agung dib_antu oleh Raihan.") . "<br>";
echo "b. " . countValidWords("Berapa u(mur minimal[ untuk !mengurus ktp?") . "<br>";
echo "c. " . countValidWords("Masing-masing anak mendap(atkan uang jajan ya=ng be&rbeda.") . "<br>";
