<?php
session_start();
if($_SERVER['REQUEST_METHOD'] === 'POST'){

    require_once 'conn.php';

    $email = $_POST['email'];
    $senha = $_POST['password'];

    $dados = $conn->query("SELECT id, password_hash FROM users WHERE email = '$email'");
    if($dados->num_rows > 0){
        $row = $dados->fetch_assoc(); 
        if(password_verify($senha, $row['password_hash'])){
        $_SESSION['user_id'] = $row['id'];
        echo "<script>alert('Login realizado com sucesso!')</script>";
        echo "<script>window.location.href = '../index.html'</script>";
        exit();
        }else{
        echo "<script>alert('Senha Incorreta!')</script>";
        echo "<script>window.location.href = '../html/login.html'</script>";
        exit();
        }
    }else{
        echo "<script>alert('Email Não Cadastrado')</script>";
        echo "<script>window.location.href = '../html/login.html'</script>";
        exit();
    }
}
?>