// ignore_for_file: unused_import

import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:graduated_proj/back_flutt/crud.dart';
import 'package:graduated_proj/back_flutt/decorationtext.dart/textcustom.dart';
import 'package:graduated_proj/back_flutt/decorationtext.dart/valid.dart';
import 'package:graduated_proj/back_flutt/link.dart';
import 'package:graduated_proj/menu/navbar.dart';
import 'package:graduated_proj/menu/pageroute.dart';
import 'package:graduated_proj/menu/service.dart';
import 'package:graduated_proj/pages/login.dart';
import 'package:graduated_proj/pages/welcome.dart';

class reset extends StatefulWidget {
  const reset({Key? key});

  @override
  _resetState createState() => _resetState();
}

class _resetState extends State<reset> {
  // bool _isNationalIdEmpty = false; // Initialize with true
  bool _isPasswordObscured = true;
    bool _isPasswordObscured2 = true;

  TextEditingController _nationalIdController =TextEditingController(); // Add this
  TextEditingController _emailController = TextEditingController();
  TextEditingController _newpasscontroller = TextEditingController();
  TextEditingController _confirmPasswordController = TextEditingController();

  // bool _isEmailValid = true;
  // bool _isPasswordValid = true;
  // bool _isConfirmPasswordValid = true;

  crud _crud = crud();
  bool isloading = false;
  GlobalKey<FormState> formstate = GlobalKey();

  resett() async {
        if (formstate.currentState!.validate()) {

      isloading = true;
      setState(() {});
      //   setState(() {
      //   });
      var response = await _crud.putreq(linksresett, {
        "email": _emailController.text,
        "national_id": _nationalIdController.text,
        "newpassword": _newpasscontroller.text,
        "checkpassword": _confirmPasswordController.text,
      });
      isloading = false;
      setState(() {});
      if (response != null &&
          response.containsKey('message') &&
          response['message'] == "Password changed successfully") {
        // sharedpref.setString("token", response["token"]);
        // sharedpref.setString("name", response['data']['name']);
        // sharedpref.setString("email", response['data']['email']);

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
  //   String password = _newpasscontroller.text;
  //   bool isValid = password.isNotEmpty && password.length >= 8;
  //   setState(() {
  //     _isPasswordValid = isValid;
  //   });
  //   return isValid;
  // }

  // bool _validateConfirmPassword() {
  //   String confirmPassword = _confirmPasswordController.text;
  //   String password = _newpasscontroller.text;
  //   bool isValid = confirmPassword.isNotEmpty && confirmPassword == password;
  //   setState(() {
  //     _isConfirmPasswordValid = isValid;
  //   });
  //   return isValid;
  // }

  // Inside your _validateFields() method
  // bool _validateFields() {
    // bool isValid =
    //     _validateEmail() & _validatePassword() & _validateConfirmPassword();

    // if (_emailController.text.isEmpty) {
    //   setState(() {
    //     _isEmailValid = false;
    //   });
    //   isValid = false;
    // }
    // if (_newpasscontroller.text.isEmpty) {
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
  //   if (_nationalIdController.text.isEmpty) {
  //     setState(() {
  //       _isNationalIdEmpty = true;
  //     });
  //     isValid = false;
  //   }

  //   return isValid;
  // }

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
                                    "نسيت كلمة السر",
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

                                  // onChanged: (value) {
                                  //   setState(() {
                                  //     _isNameEmpty = value.isEmpty;
                                  //   });
                                  // },

                                  Directionality(
                                    textDirection: TextDirection.rtl,
                                    child: 
                                    custtextform(
                                              valid: (val) {
                                                return validinput(val!, 5, 30 ,RegExp(r'^[\w-]+(\.[\w-]+)*@([\w-]+\.)+eg$'));
                                              },
                                              hint: "البريد الالكترونى",
                                              mycontroller: _emailController,
                                             preicon: Icon(Icons.email),

                                   
                                            ),
                                  ),
                                  SizedBox(height: 20),
                                  Directionality(
                                    textDirection: TextDirection.rtl,
                                    child:
                                    custtextform(
                                              valid: (val) {
                                                return validinput(val!, 10, 30);
                                              },
                                              hint: "رقم الهوية الوطنية",
                                              mycontroller: _nationalIdController,
                                             preicon: Icon(Icons.credit_card),

                                   
                                            ),
                                  

                                    //  TextField(
                                    //   controller: _nationalIdController,
                                    //   decoration: InputDecoration(
                                    //     labelText: 'رقم الهوية الوطنية',
                                    //     prefixIcon: Icon(Icons.email),
                                    //     border: OutlineInputBorder(
                                    //       borderRadius:
                                    //           BorderRadius.circular(10),
                                    //     ),
                                    //     errorText: _isNationalIdEmpty
                                    //         ? 'من فضلك املأ الحقل'
                                    //         : null ,
                                    //   ),
                                    // ),
                                  ),
                                  SizedBox(height: 20),
                                  Directionality(
                                    textDirection: TextDirection.rtl,
                                    child:
                                    custtextform(
                                              valid: (val) {
                                                return validinput(val!, 8, 30);
                                              },
                                              hint: "كلمة المرور الجديدة",
                                              mycontroller: _newpasscontroller,
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
                                    //  TextField(
                                    //   controller: _newpasscontroller,
                                    //   obscureText: _isPasswordObscured,
                                    //   decoration: InputDecoration(
                                    //     labelText: 'كلمة المرورالجديدة',
                                    //     prefixIcon: Icon(Icons.lock),
                                    //     suffixIcon: GestureDetector(
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
                                  SizedBox(height: 20),
                                  Directionality(
                                    textDirection: TextDirection.rtl,
                                    child: 
                                    custtextform(
                                              valid: (val) {
                                                return validinput(val!, 8, 30 ,null , _newpasscontroller.text);
                                              },
                                              hint: " تاكيد كلمة المرور",
                                              mycontroller: _confirmPasswordController,
                                           obstext: _isPasswordObscured2,

                                                  preicon: Icon(Icons.lock),
                                                  suficon: GestureDetector(
                                                  onTap: () {
                                                    setState(() {
                                                      _isPasswordObscured2 =
                                                          !_isPasswordObscured2;
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
                                    //   controller: _confirmPasswordController,
                                    //   obscureText: false,
                                    //   decoration: InputDecoration(
                                    //     labelText: 'تأكيد كلمة المرور',
                                    //     prefixIcon: Icon(Icons.lock),
                                    //     border: OutlineInputBorder(
                                    //       borderRadius:
                                    //           BorderRadius.circular(10),
                                    //     ),
                                    //     errorText: _isConfirmPasswordValid
                                    //         ? null
                                    //         : 'كلمة المرور غير متطابقة',
                                    //   ),
                                    // ),
                                  ),
                                  SizedBox(height: 50),
                                  ElevatedButton(
                                    onPressed: () async {
                                      // setState(() {
                                      //   _isNationalIdEmpty =
                                      //       _nationalIdController.text.isEmpty;
                                      // });

                                      // Continue with validation and account creation
                                        await resett();

                                      //   // Your logic for successful validation and account creation
                                      // // }
                                    },
                                    child: Text(
                                      'تغيير كلمة المرور',
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
