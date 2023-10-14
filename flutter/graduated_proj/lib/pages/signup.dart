// ignore_for_file: unused_import

import 'package:flutter/material.dart';
import 'package:graduated_proj/menu/service.dart';
import 'package:graduated_proj/pages/login.dart';
import 'package:graduated_proj/pages/welcome.dart';
import 'package:graduated_proj/menu/navbar.dart';



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
  TextEditingController _nationalIdController =TextEditingController(); // Add this
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
         appBar:Navbar(),
         drawer: NavbarDrawer(),
          
        body: Container(
          decoration: BoxDecoration(
            color: Color.fromARGB(255, 255, 255, 255),
          ),
          child: ListView(
            children: [
            

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
                            controller: _nameController,
                            decoration: InputDecoration(
                              labelText: 'الاسم',
                              labelStyle: TextStyle(fontSize: 20),
                              prefixIcon: Icon(Icons.person),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10),
                              ),
                        
                              errorText:
                                  _isNameEmpty ? 'من فضلك املأ الحقل' : null,
                            ),
                            onChanged: (value) {
                              setState(() {
                                _isNameEmpty = value.isEmpty;
                              });
                            },
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
                            controller: _nationalIdController,
                            decoration: InputDecoration(
                              labelText: ' رقم الهوية الوطنية',
                              labelStyle: TextStyle(fontSize: 20),
                              prefixIcon: Icon(Icons.credit_card),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10),
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
                                borderRadius: BorderRadius.circular(10),
                              ),
                            
                              errorText:
                                  _isPhoneEmpty ? 'من فضلك املأ الحقل' : null,
                            ),
                          ),
                        ),

                        SizedBox(height: 20),
                        Directionality(
                          textDirection: TextDirection.rtl,
                          child: TextField(
                            controller: _nationalityController,
                            decoration: InputDecoration(
                              labelText: 'الجنسية',
                              labelStyle: TextStyle(fontSize: 20),
                              prefixIcon: Icon(Icons.flag),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10),
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
                            controller: _universityController,
                            decoration: InputDecoration(
                              labelText: 'الجامعة',
                              labelStyle: TextStyle(fontSize: 20),
                              prefixIcon: Icon(Icons.school),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10),
                              ),
                              errorText: _isUniversityEmpty
                                  ? 'من فضلك املأ الحقل'
                                  : _isUniversityValid
                                      ? null
                                      : 'اختر من القائمة من فضلك', 
                              suffixIcon: PopupMenuButton<String>(
                                icon: Icon(Icons.arrow_drop_down),
                                itemBuilder: (BuildContext context) {
                                  return [
                                    'الفاهرة',
                                    'حلوان',
                                    'عين شمس',
                                    'المنصورة'
                                  ].map((String name) {
                                    return PopupMenuItem<String>(
                                      value: name,
                                      child: Text(name),
                                    );
                                  }).toList();
                                },
                                onSelected: (String value) {
                                  setState(() {
                                    selectedName = value;
                                    _universityController.text = value;
                                    _isUniversityValid = true;
                                    _isUniversityEmpty =
                                        false; 
                                  });
                                },
                              ),
                            ),
                            onChanged: (value) {
                              setState(() {
                                _universityController.text = value;
                                _isUniversityValid = [
                                  'الفاهرة',
                                  'حلوان',
                                  'عين شمس',
                                  'المنصورة'
                                ].contains(value);
                                _isUniversityEmpty =
                                    value.isEmpty; 
                              });
                            },
                          ),
                        ),

                        SizedBox(height: 20),
                        Directionality(
                          textDirection: TextDirection.rtl,
                          child: TextField(
                            controller: _collegeController,
                            decoration: InputDecoration(
                              labelText: 'الكلية',
                              labelStyle: TextStyle(fontSize: 20),
                              prefixIcon: Icon(Icons.flag),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10),
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
                                borderRadius: BorderRadius.circular(10),
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
                                borderRadius: BorderRadius.circular(10),
                              ),
                              errorText: _isConfirmPasswordValid
                                  ? null
                                  : 'كلمة المرور غير متطابقة',
                            ),
                          ),
                        ),

                        SizedBox(height: 50),
                        ElevatedButton(
                          onPressed: () {
                        
                            setState(() {
                              _isNationalIdEmpty =
                                  _nationalIdController.text.isEmpty;
                              _isPhoneEmpty = _phoneController.text.isEmpty;
                              _isNameEmpty = _nameController.text.isEmpty;
                              _isNationalityEmpty =
                                  _nationalityController.text.isEmpty;
                              _isCollegeEmpty = _collegeController.text.isEmpty;
                              _isUniversityEmpty =
                                  _universityController.text.isEmpty;
                              _isDepartmentEmpty =
                                  _departmentController.text.isEmpty;
                            });

                            // Continue with validation and account creation 
                            if (_validateEmail() &&
                                _validatePassword() &&
                                _validateConfirmPassword() &&
                                _validateFields() &&
                                !_isNameEmpty &&
                                !_isNationalIdEmpty &&
                                !_isPhoneEmpty &&
                                !_isNationalityEmpty &&
                                !_isCollegeEmpty &&
                                !_isUniversityEmpty &&
                                _isUniversityValid &&
                                !_isDepartmentEmpty) {
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
