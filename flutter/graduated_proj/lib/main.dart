import 'package:flutter/material.dart';
import 'package:graduated_proj/menu/service.dart';
import 'package:graduated_proj/pages/login.dart';
import 'package:graduated_proj/pages/signup.dart';

import 'package:graduated_proj/pages/welcome.dart';
void main() {
  runApp(const MyApp());
}
 
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
 
  @override
  Widget build(BuildContext context) {
    return  MaterialApp(
      initialRoute: "/" ,
      routes: {
        "/" : (context) =>  Welcome(),
        "/signup" : (context) => const SignUp(),
         "/login" : (context) => const Login(),
        
        "/service" : (context) => const ServiceScreen(),
        
      },
    );
  }
}