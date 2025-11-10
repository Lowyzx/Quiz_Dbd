<?php
if($_SERVER['REQUEST_METHOD'] ===  'POST'){
    require_once 'conn.php';
    $nome = $_POST['nome'];
    $sobrenome = $_POST['sobrenome'];
    $email = $_POST['email'];
    $senha = $_POST['password'];
    $confirmacao = $_POST['password_confirm'];

    $dados = $conn->query("SELECT email FROM users WHERE email = '$email'");
    if($dados->num_rows > 0){
        echo "<script>alert('O Email ' . $email . ' ja foi cadastrado')</script>";
        echo "<script>window.location.href = '../html/register.html'</script>";
        exit();
    }else if($senha !== $confirmacao){
        echo "<script>alert('As Senhas nao Correspondem')</script>";
        echo "<script>window.location.href = '../html/register.html'</script>";
        exit();
    }else {
        $hashedPassword = password_hash($senha, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("INSERT INTO users (nome, sobrenome, email, password_hash) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $nome, $sobrenome, $email, $hashedPassword);
        if($stmt->execute()){
            echo "<script>alert('Registro bem-sucedido!')</script>";
            echo "<script>window.location.href = '../html/login.html'</script>";
        }else{
            echo "<script>alert('Erro ao registrar. Tente novamente.')</script>";
            echo "<script>window.location.href = '../html/register.html'</script>";
        }
        $stmt->close();
    }
}