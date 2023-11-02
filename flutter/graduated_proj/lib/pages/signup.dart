// ignore_for_file: unused_import

import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:graduated_proj/back_flutt/crud.dart';
import 'package:graduated_proj/back_flutt/link.dart';
import 'package:graduated_proj/menu/navbar.dart';
import 'package:graduated_proj/menu/pageroute.dart';
import 'package:graduated_proj/menu/service.dart';
import 'package:graduated_proj/pages/login.dart';
import 'package:graduated_proj/pages/welcome.dart';

class SignUp extends StatefulWidget {
  const SignUp({Key? key});

  @override
  _SignUpState createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  TextEditingController _nameController = TextEditingController();

  bool _isNameEmpty = false;
  String selectedName = '';
  bool _isNationalityEmpty = false; // Initialize with true
  bool _isDepartmentEmpty = false;
  bool _isNationalIdEmpty = false; // Initialize with true
  bool _isPhoneEmpty = false;
  bool _isCollegeEmpty = false; // Initialize with true
  bool _isUniversityEmpty = false; // Initialize with true
  bool _isUniversityValid = true;
  bool _isPasswordObscured = true;
  bool _isotherEmpty = false;
  TextEditingController _nationalIdController =
      TextEditingController(); // Add this
  TextEditingController _phoneController = TextEditingController();
  TextEditingController _emailController = TextEditingController();
  TextEditingController _passwordController = TextEditingController();
  TextEditingController _confirmPasswordController = TextEditingController();
  TextEditingController _nationalityController = TextEditingController();
  TextEditingController _collegeController = TextEditingController();
  TextEditingController _universityController = TextEditingController();
  TextEditingController _departmentController = TextEditingController();
  TextEditingController _other_uni = TextEditingController();

  bool _isEmailValid = true;
  bool _isPasswordValid = true;
  bool _isConfirmPasswordValid = true;

  crud _crud = crud();
  bool isloading = false;

  signup() async {
    isloading = true;
    setState(() {});
    var response = await _crud.postreq(linksignup, {
      "name": _nameController.text,
      "email": _emailController.text,
      "password": _passwordController.text,
      "checkpassword": _confirmPasswordController.text,
      "phone": _phoneController.text,
      "national_id": _nationalIdController.text,
      "nationality": _nationalityController.text,
      "university": _universityController.text,
      "faculity": _collegeController.text,
      "department": _departmentController.text,
      "other_uni": _other_uni.text,
    });
    isloading = false;
    setState(() {});
    if (response != null &&
        response.containsKey('message') &&
        response['message'] == "User registered successfully") {
      Navigator.pushAndRemoveUntil(
          context,
          SlidePageRoute(
            page: Login(),
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

  GlobalKey<FormState> formstate = GlobalKey();

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
        _validateEmail() & _validatePassword() & _validateConfirmPassword();

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
    // if (_confirmPasswordController.text.isEmpty) {
    //   setState(() {
    //     _isConfirmPasswordValid = false;
    //   });
    //   isValid = false;
    // }
    if (_nationalIdController.text.isEmpty) {
      setState(() {
        _isNationalIdEmpty = true;
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
        body: isloading == true
            ? Center(
                child: CircularProgressIndicator(),
              )
            : Container(
                decoration: BoxDecoration(
                  color: Color.fromARGB(255, 255, 255, 255),
                ),
                child: Column(
                  children: [
                    Expanded(
                      child: ListView(
                        children: [
                          Form(
                            // key: formstate,
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
                                    " انشاء حساب",
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
                                    child: TextField(
                                      controller: _nameController,
                                      decoration: InputDecoration(
                                        labelText: 'الاسم',
                                        labelStyle: TextStyle(fontSize: 20),
                                        prefixIcon: Icon(Icons.person),
                                        border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                        ),
                                        errorText: _isNameEmpty
                                            ? 'من فضلك املأ الحقل'
                                            : null,
                                      ),
                                      // onChanged: (value) {
                                      //   setState(() {
                                      //     _isNameEmpty = value.isEmpty;
                                      //   });
                                      // },
                                    ),
                                  ),
                                  SizedBox(height: 20),
                                  Directionality(
                                    textDirection: TextDirection.rtl,
                                    child: TextField(
                                      controller: _emailController,
                                      decoration: InputDecoration(
                                        labelText: 'البريد الالكتروني',
                                        prefixIcon: Icon(Icons.email),
                                        border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
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
                                      controller: _nationalIdController,
                                        keyboardType: TextInputType.number,

                                      decoration: InputDecoration(
                                        labelText: ' رقم الهوية الوطنية',
                                        labelStyle: TextStyle(fontSize: 20),
                                        prefixIcon: Icon(Icons.credit_card),
                                        border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                        ),
                                        errorText: _isNationalIdEmpty
                                            ? 'من فضلك املأ الحقل'
                                            : null,
                                      ),
                                    ),
                                  ),
                                  SizedBox(height: 20),
                                  Directionality(
                                    textDirection: TextDirection.rtl,
                                    child: TextField(
                                      keyboardType: TextInputType.phone,
                                      controller: _phoneController,
                                      decoration: InputDecoration(
                                        labelText: 'رقم الهاتف',
                                        labelStyle: TextStyle(fontSize: 20),
                                        prefixIcon: Icon(Icons.phone),
                                        border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                        ),
                                        errorText: _isPhoneEmpty
                                            ? 'من فضلك املأ الحقل'
                                            : null,
                                      ),
                                    ),
                                  ),
                                  SizedBox(height: 20),
                                  Directionality(
                                    textDirection: TextDirection.rtl,
                                    child: TextField(
                                      controller: _nationalityController,
                                       keyboardType: TextInputType.text,

                                      decoration: InputDecoration(
                                        labelText: 'الجنسية',
                                        labelStyle: TextStyle(fontSize: 20),
                                        prefixIcon: Icon(Icons.flag),
                                        border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                        ),
                                        errorText: _isNationalityEmpty
                                            ? 'من فضلك املأ الحقل'
                                            : null,
                                      ),
                                    ),
                                  ),
                                  SizedBox(height: 10),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: [
                                      Align(
                                          alignment: Alignment.centerRight,
                                          child: Text("جامعة" , style: TextStyle(fontSize: 18) ,)),
                                      Align(
                                        alignment: Alignment.centerRight,
                                        child: DropdownButton<String>( 
                                          alignment: Alignment.centerRight,
                                          value: _universityController.text,
                                          onChanged: (value) {
                                            setState(() {
                                              _universityController.text =
                                                  value!;
                                            });
                                          },
                                          items: [
                                            DropdownMenuItem<String>(
                                              alignment: Alignment.centerRight,
                                              value: "",
                                              child: Text("اختار جامعة",style: TextStyle(fontSize: 18) ,),
                                            ),
                                            DropdownMenuItem<String>(
                                              alignment: Alignment.centerRight,
                                              value: "1",
                                              child: Text("جامعة حلوان"),
                                            ),
                                            DropdownMenuItem<String>(
                                              alignment: Alignment.centerRight,
                                              value: "0",
                                              child: Text("جامعة اخرى"),
                                            ),
                                          ],
                                        ),
                                      ),
                               SizedBox(height: 10),

                                      if (_universityController.text == "0")
                                        Directionality(
                                          textDirection: TextDirection.rtl,
                                          child: TextField(
                                            controller: _other_uni,
                                            decoration: InputDecoration(
                                              labelText: "اسم الجامعة",
                                              labelStyle:
                                                  TextStyle(fontSize: 20),
                                              prefixIcon: Icon(Icons.flag),
                                              border: OutlineInputBorder(
                                                borderRadius:
                                                    BorderRadius.circular(10),
                                              ),
                                              errorText: _isotherEmpty
                                                  ? 'من فضلك املأ الحقل'
                                                  : null,
                                            ),
                                          ),
                                        ),
                                    ],
                                  ),
                                  SizedBox(height: 10),
                                  Directionality(
                                    textDirection: TextDirection.rtl,
                                    child: TextField(
                                      controller: _collegeController,
                                      decoration: InputDecoration(
                                        labelText: 'الكلية',
                                        labelStyle: TextStyle(fontSize: 20),
                                        prefixIcon: Icon(Icons.flag),
                                        border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                        ),
                                        errorText: _isNationalityEmpty
                                            ? 'من فضلك املأ الحقل'
                                            : null,
                                      ),
                                    ),
                                  ),
                                  SizedBox(height: 20),
                                  Directionality(
                                    textDirection: TextDirection.rtl,
                                    child: TextField(
                                      controller: _departmentController,
                                      decoration: InputDecoration(
                                        labelText: 'القسم',
                                        labelStyle: TextStyle(fontSize: 20),
                                        prefixIcon: Icon(Icons.book),
                                        border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                        ),
                                        errorText: _isDepartmentEmpty
                                            ? 'من فضلك املأ الحقل'
                                            : null,
                                      ),
                                      onChanged: (value) {
                                        setState(() {
                                          _isDepartmentEmpty = value.isEmpty;
                                        });
                                      },
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
                                        border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                        ),
                                        errorText: _isPasswordValid
                                            ? null
                                            : 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل',
                                      ),
                                    ),
                                  ),
                                  SizedBox(height: 20),
                                  Directionality(
                                    textDirection: TextDirection.rtl,
                                    child: TextField(
                                      controller: _confirmPasswordController,
                                      obscureText: false,
                                      decoration: InputDecoration(
                                        labelText: 'تأكيد كلمة المرور',
                                        prefixIcon: Icon(Icons.lock),
                                        border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                        ),
                                        errorText: _isConfirmPasswordValid
                                            ? null
                                            : 'كلمة المرور غير متطابقة',
                                      ),
                                    ),
                                  ),
                                  SizedBox(height: 50),
                                  ElevatedButton(
                                    onPressed: () async {
                                      setState(() {
                                        _isNationalIdEmpty =
                                            _nationalIdController.text.isEmpty;
                                        _isPhoneEmpty =
                                            _phoneController.text.isEmpty;
                                        _isNameEmpty =
                                            _nameController.text.isEmpty;
                                        _isNationalityEmpty =
                                            _nationalityController.text.isEmpty;
                                        _isCollegeEmpty =
                                            _collegeController.text.isEmpty;
                                        _isUniversityEmpty =
                                            _universityController.text.isEmpty;
                                        _isDepartmentEmpty =
                                            _departmentController.text.isEmpty;
                                        _isotherEmpty = _other_uni.text.isEmpty;
                                      });

                                      // Continue with validation and account creation
                                      if (_validateFields() &&
                                          !_isNameEmpty &&
                                          !_isNationalIdEmpty &&
                                          !_isPhoneEmpty &&
                                          !_isNationalityEmpty &&
                                          !_isCollegeEmpty &&
                                          //  !_isotherEmpty&&

                                          !_isUniversityEmpty &&
                                          _isUniversityValid &&
                                          !_isDepartmentEmpty) {
                                        await signup();

                                        // Your logic for successful validation and account creation
                                      }
                                    },
                                    child: Text(
                                      ' انشاء حساب',
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
                                  SizedBox(height: 10),
                                  TextButton(
                                    onPressed: () {
                                      Navigator.pushReplacement(
                                        context,
                                        SlidePageRoute(
                                          page: Login(),
                                          animationDuration:
                                              Duration(seconds: 2),
                                          slideFromTop: true,
                                        ),
                                      );
                                    },
                                    child: Text(
                                      "لديك حساب؟ سجل دخول.." ,
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
                      ),
                    ),
                  ],
                ),
              ),
      ),
    );
  }
}
