// ignore_for_file: unused_field, unused_import

import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:graduated_proj/back_flutt/crud.dart';
import 'package:graduated_proj/back_flutt/decorationtext.dart/textcustom.dart';
import 'package:graduated_proj/back_flutt/decorationtext.dart/valid.dart';
import 'package:graduated_proj/back_flutt/link.dart';
import 'package:graduated_proj/main.dart';
import 'package:graduated_proj/menu/navbar.dart';
import 'package:graduated_proj/menu/service.dart';
import 'package:graduated_proj/pages/reset.dart';
import 'package:graduated_proj/pages/signup.dart';
import 'package:graduated_proj/pages/welcome.dart';
import 'package:graduated_proj/pages/welcome_aft.dart';

import '../menu/pageroute.dart';

class AnimationsRoute extends MaterialPageRoute {
  AnimationsRoute({required Widget page})
      : super(builder: (BuildContext context) => page);
}

class Login extends StatefulWidget {
  const Login({Key? key});

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  TextEditingController _nameController = TextEditingController();

  bool _isPasswordObscured = true;
  TextEditingController _emailController = TextEditingController();
  TextEditingController _passwordController = TextEditingController();
  // TextEditingController _confirmPasswordController = TextEditingController();

  // bool _isEmailValid = true;
  // bool _isPasswordValid = true;
  // bool _isConfirmPasswordValid = true;
  GlobalKey<FormState> formstate = GlobalKey();
  crud _crud = crud();
  bool isloading = false;

  login() async {
    if (formstate.currentState!.validate()) {
      isloading = true;
      setState(() {});
      //   setState(() {
      //   });
      var response = await _crud.postreq(linkslogin, {
        "email": _emailController.text,
        "password": _passwordController.text,
      });
      isloading = false;
      setState(() {});
      if (response != null &&
          response.containsKey('login') &&
          response['login'] == true) {
        sharedpref.setString("token", response["token"]);
        // sharedpref.setString("name", response['data']['name']);
        // sharedpref.setString("email", response['data']['email']);

        Navigator.pushAndRemoveUntil(
            context,
            SlidePageRoute(
              page: welcome_aft(),
              animationDuration: Duration(seconds: 2),
              slideFromTop: true,
            ),
            (route) => false);
      } else {
        AwesomeDialog(
                context: context,
                title: "warning",
                body: Text(response['message'][0]))
            .show();
      }
    }
  }

  // bool _validateEmail() {
  //   String email = _emailController.text.trim();
  //   bool isValid = email.isNotEmpty &&
  //       RegExp(r'^[\w-]+(\.[\w-]+)*@([\w-]+\.)+eg$').hasMatch(email);
  //   setState(() {
  //     _isEmailValid = isValid;
  //   });
  //   return isValid;
  // }

  // bool _validatePassword() {
  //   String password = _passwordController.text;
  //   bool isValid = password.isNotEmpty && password.length >= 8;
  //   setState(() {
  //     _isPasswordValid = isValid;
  //   });
  //   return isValid;
  // }

  // bool _validateConfirmPassword() {
  //   String confirmPassword = _confirmPasswordController.text;
  //   String password = _passwordController.text;
  //   bool isValid = confirmPassword.isNotEmpty && confirmPassword == password;
  //   setState(() {
  //     _isConfirmPasswordValid = isValid;
  //   });
  //   return isValid;
  // }

  // Inside your _validateFields() method
  // bool _validateFields() {
  //   bool isValid =  _validatePassword();

    // if (_emailController.text.isEmpty) {
    //   setState(() {
    //     _isEmailValid = false;
    //   });
    //   isValid = false;
    // }
    // if (_passwordController.text.isEmpty) {
    //   setState(() {
    //     _isPasswordValid = false;
    //   });
    //   isValid = false;
    // }

  //   return isValid;
  // }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: Navbar(),
        drawer: NavbarDrawer(),
        body: Container(
          decoration: BoxDecoration(
            color: Color.fromARGB(255, 255, 255, 255),
          ),
          child: Column(
            children: [
              Expanded(
                child: isloading == true
                    ? Center(
                        child: CircularProgressIndicator(),
                      )
                    : ListView(
                        children: [
                          // ... الأكواد السابقة للمستطيلات الأخرى

                          Form(
                              key: formstate,
                              child: Center(
                                  child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Image.asset(
                                    'assets/images/Helwan_University.jpg',
                                    width: 900,
                                    height: 200,
                                  ),
                                  SizedBox(height: 30),
                                  Text(
                                    "تسجيل دخول",
                                    style: TextStyle(
                                      fontSize: 35,
                                      fontWeight: FontWeight.w600,
                                      color: Color(0xFFAD8700),
                                      fontFamily: 'Roboto',
                                    ),
                                  ),
                                  SizedBox(height: 5),
                                  SingleChildScrollView(
                                    child: Container(
                                      width: double.infinity,
                                      decoration: BoxDecoration(
                                        color: Colors.white,
                                        borderRadius: BorderRadius.only(
                                          topLeft: Radius.circular(40),
                                          topRight: Radius.circular(40),
                                        ),
                                      ),
                                      child: Column(
                                        children: [
                                          SizedBox(height: 20),
                                          Directionality(
                                            textDirection: TextDirection.rtl,
                                            child: 
                                            custtextform(
                                              valid: (val) {
                                                return validinput(val!, 5, 30 ,RegExp(r'^[\w-]+(\.[\w-]+)*@([\w-]+\.)+eg$') );
                                              },
                                              hint: "البريد الالكترونى",
                                              mycontroller: _emailController,
                                                  preicon: Icon(Icons.email),

                                            ),
                                            // TextField(
                                            //   controller: _emailController,
                                            //   decoration: InputDecoration(
                                            //     labelText: 'البريد الالكتروني',
                                            //     prefixIcon: Icon(Icons.email),
                                            //     border: OutlineInputBorder(
                                            //       borderRadius:
                                            //           BorderRadius.circular(10),
                                            //     ),
                                            //     errorText: _isEmailValid
                                            //         ? null
                                            //         : 'البريد الإلكتروني غير صالح',
                                            //   ),
                                            // ),
                                          ),
                                          SizedBox(height: 20),
                                          Directionality(
                                            textDirection: TextDirection.rtl,
                                            child: 
                                             custtextform(
                                              valid: (val) {
                                                return validinput(val!, 8, 30 );
                                              },
                                              hint: "كلمة المرور",
                                              mycontroller: _passwordController,
                                           obstext: _isPasswordObscured,

                                                  preicon: Icon(Icons.lock),
                                                  suficon: GestureDetector(
                                                  onTap: () {
                                                    setState(() {
                                                      _isPasswordObscured =
                                                          !_isPasswordObscured;
                                                    });
                                                  },
                                                  child: Icon(
                                                    _isPasswordObscured
                                                        ? Icons.visibility_off
                                                        : Icons.visibility,
                                                  ),
                                                ),

                                            ),
                                            
                                            // TextField(
                                            //   controller: _passwordController,
                                            //   obscureText: _isPasswordObscured,
                                            //   decoration: InputDecoration(
                                            //     labelText: 'كلمة المرور',
                                            //     prefixIcon: Icon(Icons.lock),
                                            //     suffixIcon: 
                                            // GestureDetector(
                                            //       onTap: () {
                                            //         setState(() {
                                            //           _isPasswordObscured =
                                            //               !_isPasswordObscured;
                                            //         });
                                            //       },
                                            //       child: Icon(
                                            //         _isPasswordObscured
                                            //             ? Icons.visibility_off
                                            //             : Icons.visibility,
                                            //       ),
                                            //     ),
                                            //     border: OutlineInputBorder(
                                            //       borderRadius:
                                            //           BorderRadius.circular(10),
                                            //     ),
                                            //     errorText: _isPasswordValid
                                            //         ? null
                                            //         : 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل',
                                            //   ),
                                            // ),
                                          ),
                                          SizedBox(height: 50),
                                          ElevatedButton(
                                            onPressed: () async {
                                              // Continue with validation and account creation
                                                await login();

                                                // Your logic for successful validation and account creation
                                            
                                              // else {
                                              //   setState(() {
                                              //     _isEmailValid =
                                              //         _emailController.text.isNotEmpty;
                                              //     _isPasswordValid = _passwordController
                                              //         .text.isNotEmpty;
                                              //   });
                                              // }
                                            },
                                            child: Text(
                                              'تسجيل دخول',
                                              style: TextStyle(
                                                fontSize: 24,
                                                color: Colors.white,
                                              ),
                                            ),
                                            style: ElevatedButton.styleFrom(
                                              primary: Color(0xFFAD8700),
                                              padding: EdgeInsets.symmetric(
                                                  horizontal: 100, vertical: 5),
                                              shape: RoundedRectangleBorder(
                                                borderRadius:
                                                    BorderRadius.circular(30),
                                              ),
                                            ),
                                          ),
                                          SizedBox(height: 16),
                                          TextButton(
                                            onPressed: () {
                                              Navigator.pushReplacement(
                                                context,
                                                SlidePageRoute(
                                                  page: SignUp(),
                                                  animationDuration:
                                                      Duration(seconds: 2),
                                                  slideFromTop: true,
                                                ),
                                              );
                                            },
                                            child: Text(
                                              'لا تمتلك حساب؟ سجل الآن',
                                              style: TextStyle(
                                                fontSize: 18,
                                                color: Color(0xFFAD8700),
                                              ),
                                            ),
                                          ),
                                          TextButton(
                                            onPressed: () {
                                              Navigator.push(
                                                context,
                                                SlidePageRoute(
                                                  page: reset(),
                                                  animationDuration:
                                                      Duration(seconds: 2),
                                                  slideFromTop: true,
                                                ),
                                              );
                                            },
                                            child: Text(
                                              'نسيت كلمة المرور',
                                              style: TextStyle(
                                                fontSize: 18,
                                                color: Color(0xFFAD8700),
                                              ),
                                            ),
                                          ),
                                          SizedBox(height: 69),
                                        ],
                                      ),
                                    ),
                                  ),
                                ],
                              ))),
                        ],
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
