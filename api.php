<?php
$dataFile = 'data.json';

// Leer bicicletas
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        echo '[]';
    }
    exit;
}

// Guardar bicicleta nueva
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $bicicletas = [];

    if (file_exists($dataFile)) {
        $bicicletas = json_decode(file_get_contents($dataFile), true);
    }

    $input['id'] = uniqid();
$bicicletas[] = $input;
file_put_contents($dataFile, json_encode($bicicletas, JSON_PRETTY_PRINT));
echo json_encode(['mensaje' => 'Guardado correctamente', 'id' => $input['id']]); // ← esto es importante
    exit;
}

// Editar bicicleta
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    $bicicletas = json_decode(file_get_contents($dataFile), true);

    foreach ($bicicletas as &$bici) {
        if ($bici['id'] === $input['id']) {
            $bici = $input;
            break;
        }
    }

    file_put_contents($dataFile, json_encode($bicicletas, JSON_PRETTY_PRINT));
    echo json_encode(['mensaje' => 'Actualizado correctamente']);
    exit;
}

// Eliminar bicicleta
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true);
    $bicicletas = json_decode(file_get_contents($dataFile), true);

    $bicicletas = array_filter($bicicletas, fn($bici) => $bici['id'] !== $input['id']);

    file_put_contents($dataFile, json_encode(array_values($bicicletas), JSON_PRETTY_PRINT));
    echo json_encode(['mensaje' => 'Eliminado correctamente']);
    exit;
}
?>
