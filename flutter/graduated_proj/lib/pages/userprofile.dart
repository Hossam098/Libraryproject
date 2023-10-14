import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:graduated_proj/menu/navbar.dart';

class UserProfile extends StatefulWidget {
  @override
  _UserProfileState createState() => _UserProfileState();
}

class _UserProfileState extends State<UserProfile> {
  TextEditingController _nameController = TextEditingController();
  TextEditingController _nationalIdController =TextEditingController(); 
  TextEditingController _phoneController = TextEditingController();
  TextEditingController _emailController = TextEditingController();
  TextEditingController _nationalityController = TextEditingController();
  TextEditingController _collegeController = TextEditingController();
  TextEditingController _universityController = TextEditingController();
  TextEditingController _departmentController = TextEditingController();

  String? _updatedName;
  String? _updatedEmail;

  
  void _updateUserData() {
    setState(() {
      _updatedName =
          _nameController.text.isNotEmpty ? _nameController.text : null;
      _updatedEmail =
          _emailController.text.isNotEmpty ? _emailController.text : null;
    });
    FocusScope.of(context).requestFocus(FocusNode());
    print('تم تحديث البيانات.');
  }
  File? _pickedImage;

  Future<void> _pickImage() async {
  final picker = ImagePicker();
  final pickedFile = await picker.pickImage(source: ImageSource.gallery);

  setState(() {
    if (pickedFile != null) {
      _pickedImage = File(pickedFile.path);
    }
  });
}








  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('الملف الشخصي'),
        backgroundColor: Color.fromARGB(255, 16, 54, 92),
      ),
      backgroundColor: Colors.white, // تغيير لون الخلفية إلى أحمر
      body: ListView(
        children: [
          Center(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                children: <Widget>[
                  GestureDetector(
                    onTap: _pickImage,  // تحديد صورة الملف الشخصي
                    child:CircleAvatar(
  radius: 50,
  backgroundImage: _pickedImage != null
      ? FileImage(_pickedImage!)
      : null, // Set backgroundImage to null if _pickedImage is null
  child: _pickedImage == null
      ? Icon(Icons.person, size: 90)  // Display a person icon if _pickedImage is null
      : null,  // No child when _pickedImage is not null
),



                  ),
                 
                  if (_updatedName != null &&
                      _updatedEmail != null &&
                      _collegeController.text.isNotEmpty)
                    Container(
                      margin: EdgeInsets.only(top: 6),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      padding: EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Text(
                            '$_updatedName',
                            textAlign: TextAlign.right,
                            style: TextStyle(
                                fontSize: 20,
                                color: Colors.black,
                                fontWeight: FontWeight.w700),
                          ),
                        ],
                      ),
                    ),
                  SizedBox(height: 10),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(16.0),
                    decoration: BoxDecoration(
                      color: Color.fromARGB(255, 16, 54, 92),
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      mainAxisAlignment:
                          MainAxisAlignment.end, // توسيط النص إلى اليمين
                      children: [
                        Text(
                          ' : الاسم',
                          style: TextStyle(color: Colors.white),
                          textAlign: TextAlign.right,
                        ),
                        TextField(
                          controller: _nameController,
                          textAlign: TextAlign.right,
                          style: TextStyle(color: Colors.black), // لون النص
                          decoration: InputDecoration(
                            hintText: 'الاسم',
                            hintStyle: TextStyle(color: Colors.grey),
                            alignLabelWithHint: false,
                            contentPadding: EdgeInsets.only(right: 12.0),
                            border: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.white),
                              borderRadius: BorderRadius.circular(8.0),
                            ),
                            filled: true,
                            fillColor: Colors.white,
                            labelStyle: TextStyle(color: Colors.black),
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          ' : البريد الالكتروني',
                          style: TextStyle(color: Colors.white),
                          textAlign: TextAlign.right,
                        ),
                        TextField(
                          controller: _emailController,
                          textAlign: TextAlign.right,
                          style: TextStyle(color: Colors.black), // لون النص
                          decoration: InputDecoration(
                            hintText: 'البريد الالكتروني',
                            hintStyle: TextStyle(color: Colors.grey),
                            alignLabelWithHint: false,
                            contentPadding: EdgeInsets.only(right: 12.0),
                            border: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.white),
                              borderRadius: BorderRadius.circular(8.0),
                            ),
                            filled: true,
                            fillColor: Colors.white,
                            labelStyle: TextStyle(color: Colors.black),
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          ' : رقم الهوية الوطنية',
                          style: TextStyle(color: Colors.white),
                          textAlign: TextAlign.right,
                        ),
                        TextField(
                          controller: _nationalIdController,
                          textAlign: TextAlign.right,
                          style: TextStyle(color: Colors.black), // لون النص
                          decoration: InputDecoration(
                            hintText: 'رقم الهوية الوطنية',
                            hintStyle: TextStyle(color: Colors.grey),
                            alignLabelWithHint: false,
                            contentPadding: EdgeInsets.only(right: 12.0),
                            border: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.white),
                              borderRadius: BorderRadius.circular(8.0),
                            ),
                            filled: true,
                            fillColor: Colors.white,
                            labelStyle: TextStyle(color: Colors.black),
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          ' : رقم الهاتف',
                          style: TextStyle(color: Colors.white),
                          textAlign: TextAlign.right,
                        ),
                        TextField(
                          controller: _phoneController,
                          keyboardType: TextInputType.phone,
                          textAlign: TextAlign.right,
                          style: TextStyle(color: Colors.black), // لون النص
                          decoration: InputDecoration(
                            hintText: 'رقم الهاتف',
                            hintStyle: TextStyle(color: Colors.grey),
                            alignLabelWithHint: false,
                            contentPadding: EdgeInsets.only(right: 12.0),
                            border: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.white),
                              borderRadius: BorderRadius.circular(8.0),
                            ),
                            filled: true,
                            fillColor: Colors.white,
                            labelStyle: TextStyle(color: Colors.black),
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          ' : الجنسية',
                          style: TextStyle(color: Colors.white),
                          textAlign: TextAlign.right,
                        ),
                        TextField(
                          controller: _nationalityController,
                          textAlign: TextAlign.right,
                          style: TextStyle(color: Colors.black), // لون النص
                          decoration: InputDecoration(
                            hintText: 'الجنسية',
                            hintStyle: TextStyle(color: Colors.grey),
                            alignLabelWithHint: false,
                            contentPadding: EdgeInsets.only(right: 12.0),
                            border: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.white),
                              borderRadius: BorderRadius.circular(8.0),
                            ),
                            filled: true,
                            fillColor: Colors.white,
                            labelStyle: TextStyle(color: Colors.black),
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          ' : الجامعة',
                          style: TextStyle(color: Colors.white),
                          textAlign: TextAlign.right,
                        ),
                        TextField(
                          controller: _universityController,
                          textAlign: TextAlign.right,
                          style: TextStyle(color: Colors.black), // لون النص
                          decoration: InputDecoration(
                            hintText: 'الجامعة',
                            hintStyle: TextStyle(color: Colors.grey),
                            alignLabelWithHint: false,
                            contentPadding: EdgeInsets.only(right: 12.0),
                            border: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.white),
                              borderRadius: BorderRadius.circular(8.0),
                            ),
                            filled: true,
                            fillColor: Colors.white,
                            labelStyle: TextStyle(color: Colors.black),
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          ' : الكلية',
                          style: TextStyle(color: Colors.white),
                          textAlign: TextAlign.right,
                        ),
                        TextField(
                          controller: _collegeController,
                          textAlign: TextAlign.right,
                          style: TextStyle(color: Colors.black), // لون النص
                          decoration: InputDecoration(
                            hintText: 'الكلية',
                            hintStyle: TextStyle(color: Colors.grey),
                            alignLabelWithHint: false,
                            contentPadding: EdgeInsets.only(right: 12.0),
                            border: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.white),
                              borderRadius: BorderRadius.circular(8.0),
                            ),
                            filled: true,
                            fillColor: Colors.white,
                            labelStyle: TextStyle(color: Colors.black),
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          ' : القسم',
                          style: TextStyle(color: Colors.white),
                          textAlign: TextAlign.right,
                        ),
                        TextField(
                          controller: _departmentController,
                          textAlign: TextAlign.right,
                          style: TextStyle(color: Colors.black), // لون النص
                          decoration: InputDecoration(
                            hintText: 'القسم',
                            hintStyle: TextStyle(color: Colors.grey),
                            alignLabelWithHint: false,
                            contentPadding: EdgeInsets.only(right: 12.0),
                            border: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.white),
                              borderRadius: BorderRadius.circular(8.0),
                            ),
                            filled: true,
                            fillColor: Colors.white,
                            labelStyle: TextStyle(color: Colors.black),
                          ),
                        ),
                        SizedBox(height: 20),
                        Container(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: _updateUserData,
                            style: ElevatedButton.styleFrom(
                              primary: Color(0xFFAD8700),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(7.0),
                              ),
                            ),
                            child: Text(
                              'تعديل البيانات الشخصية',
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 20),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: UserProfile(),
  ));
}
