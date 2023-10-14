// ignore_for_file: unused_field, unused_import

import 'package:flutter/material.dart';
import 'package:graduated_proj/menu/navbar.dart';
import 'package:graduated_proj/menu/service.dart';
import 'package:graduated_proj/pages/signup.dart';
import 'package:graduated_proj/pages/welcome.dart';

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
  TextEditingController _nationalIdController = TextEditingController(); 
  TextEditingController _phoneController = TextEditingController();
  TextEditingController _emailController = TextEditingController();
  TextEditingController _passwordController = TextEditingController();
  TextEditingController _confirmPasswordController = TextEditingController();
  TextEditingController _nationalityController = TextEditingController();
  TextEditingController _collegeController = TextEditingController();
  TextEditingController _universityController = TextEditingController();
  TextEditingController _departmentController = TextEditingController();
  bool _isEmailValid = true;
  bool _isPasswordValid = true;
  bool _isConfirmPasswordValid = true;

  bool _validateEmail() {
    String email = _emailController.text.trim();
    bool isValid = email.isNotEmpty &&
        RegExp(r'^[\w-]+(\.[\w-]+)*@([\w-]+\.)+eg$').hasMatch(email);
    setState(() {
      _isEmailValid = isValid;
    });
    return isValid;
  }

  bool _validatePassword() {
    String password = _passwordController.text;
    bool isValid = password.isNotEmpty && password.length >= 8;
    setState(() {
      _isPasswordValid = isValid;
    });
    return isValid;
  }

  bool _validateConfirmPassword() {
    String confirmPassword = _confirmPasswordController.text;
    String password = _passwordController.text;
    bool isValid = confirmPassword.isNotEmpty && confirmPassword == password;
    setState(() {
      _isConfirmPasswordValid = isValid;
    });
    return isValid;
  }

  // Inside your _validateFields() method
  bool _validateFields() {
    bool isValid =
        _validateEmail() && _validatePassword() && _validateConfirmPassword();

    if (_emailController.text.isEmpty) {
      setState(() {
        _isEmailValid = false;
      });
      isValid = false;
    }
    if (_passwordController.text.isEmpty) {
      setState(() {
        _isPasswordValid = false;
      });
      isValid = false;
    }
    if (_confirmPasswordController.text.isEmpty) {
      setState(() {
        _isConfirmPasswordValid = false;
      });
      isValid = false;
    }

    return isValid;
  }

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
          child: ListView(
            children: [
              // ... الأكواد السابقة للمستطيلات الأخرى

              Center(
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
                  ],
                ),
              ),
              
              SizedBox(height: 5),
              Expanded(
                child: SingleChildScrollView(
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
                          child: TextField(
                            controller: _emailController,
                            decoration: InputDecoration(
                              labelText: 'البريد الالكتروني',
                              prefixIcon: Icon(Icons.email),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10),
                              ),
                              errorText: _isEmailValid
                                  ? null
                                  : 'البريد الإلكتروني غير صالح',
                            ),
                          ),
                        ),
                        SizedBox(height: 20),

                        Directionality(
                          textDirection: TextDirection.rtl,
                          child: TextField(
                            controller: _passwordController,
                            obscureText: _isPasswordObscured,
                            decoration: InputDecoration(
                              labelText: 'كلمة المرور',
                              prefixIcon: Icon(Icons.lock),
                              suffixIcon: GestureDetector(
                                onTap: () {
                                  setState(() {
                                    _isPasswordObscured = !_isPasswordObscured;
                                  });
                                },
                                child: Icon(
                                  _isPasswordObscured
                                      ? Icons.visibility_off
                                      : Icons.visibility,
                                ),
                              ),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10),
                              ),
                              errorText: _isPasswordValid
                                  ? null
                                  : 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل',
                            ),
                          ),
                        ),

                        SizedBox(height: 50),
                        ElevatedButton(
                          onPressed: () {
                        
                            setState(() {});

                            // Continue with validation and account creation 
                            if (_validateEmail() &&
                                _validatePassword() &&
                                _validateConfirmPassword() &&
                                _validateFields()) {
                              // Your logic for successful validation and account creation
                            }
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
                              borderRadius: BorderRadius.circular(30),
                            ),
                          ),
                        ),
                        SizedBox(height: 16), 

                        TextButton(
                          onPressed: () {
                            Navigator.push(
                              context,
                              SlidePageRoute(
                                page: SignUp(),
                                animationDuration: Duration(seconds: 2),
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
                          onPressed: () {},
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
              ),
            ],
          ),
        ),
      ),
    );
  }


}
