<?php
header('Content-Type: text/html; charset=utf-8');

$servername = "localhost";
$username = "u2640154_diplom";
$password = "uS2qV2aF2fqT2rG3";
$dbname = "u2640154_diplom";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$response = array('status' => '', 'message' => '');

if (isset($_POST['name']) && isset($_POST['phone'])) {
    $name = $conn->real_escape_string($_POST['name']);
    $phone = $conn->real_escape_string($_POST['phone']);

    // Формирование текста сообщения для отправки на почту
    $message = "Имя: $name\n";
    $message .= "Телефон: $phone\n";

    // Адрес, на который будет отправлено письмо
    $to = "diplom-test@dopogtver.ru";

    // Заголовки электронной почты
    $headers = "From: diplom-test@dopogtver.ru\r\n";
    $headers .= "Reply-To: diplom-test@dopogtver.ru\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Отправка письма
    if (mail($to, "Новая заявка", $message, $headers)) {
        $response['status'] = 'success';
        $response['message'] = 'Заявка успешно отправлена!';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Ошибка при отправке заявки.';
        error_log("Mail sending failed");
    }

    // Сохранение данных в базу данных
    $sql = "INSERT INTO diplom (name, phone) VALUES ('$name', '$phone')";

    if ($conn->query($sql) === TRUE) {
        $response['message'] .= " Заявка успешно сохранена в базе данных!";
    } else {
        $response['status'] = 'error';
        $response['message'] .= " Ошибка при сохранении заявки в базе данных: " . $conn->error;
        error_log("Database insert failed: " . $conn->error);
    }
} else {
    $response['status'] = 'error';
    $response['message'] = "Ошибка: данные формы не были отправлены.";
    error_log("Form data not submitted properly");
}

$conn->close();

echo json_encode($response);
?>
