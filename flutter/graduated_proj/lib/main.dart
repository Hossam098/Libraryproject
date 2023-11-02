import 'package:flutter/material.dart';
import 'package:graduated_proj/menu/service.dart';
import 'package:graduated_proj/pages/login.dart';
import 'package:graduated_proj/pages/reset.dart';
import 'package:graduated_proj/pages/signup.dart';

import 'package:graduated_proj/pages/welcome.dart';
import 'package:graduated_proj/pages/welcome_aft.dart';
import 'package:shared_preferences/shared_preferences.dart';


late SharedPreferences sharedpref;


void main()async {
  WidgetsFlutterBinding.ensureInitialized();
  sharedpref = await SharedPreferences.getInstance();  
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: sharedpref.getString("token") == null ? 
      "/" :
      "/welcome_aft",
      routes: {
        "/": (context) => Welcome(),
        "/signup": (context) => const SignUp(),
        "/login": (context) => const Login(),
        "/service": (context) => const ServiceScreen(),
       "/welcome_aft": (context) =>  welcome_aft(),
       "/reset": (context) =>  reset(),


      },
    );
  }
}
