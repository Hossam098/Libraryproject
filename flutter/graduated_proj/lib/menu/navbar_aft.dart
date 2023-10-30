// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:graduated_proj/menu/about_liberary.dart';
import 'package:graduated_proj/menu/service.dart';
import 'package:graduated_proj/menu/contact.dart';
import 'package:graduated_proj/pages/login.dart';
import 'package:graduated_proj/pages/userprofile.dart';
import 'package:graduated_proj/pages/Registered services.dart';
import 'package:graduated_proj/pages/welcome.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import '../menu/pageroute.dart';

class Navbar extends StatelessWidget implements PreferredSizeWidget {
  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      leading: IconButton(
        icon: Icon(
          Icons.arrow_back,
          size: 30,
        ),
        onPressed: () {
          Navigator.pop(context);
        },
      ),
      titleSpacing: 0,
      title: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          Builder(
            builder: (BuildContext context) {
              return IconButton(
                icon: Icon(
                  Icons.menu,
                  size: 30,
                ),
                onPressed: () {
                  Scaffold.of(context).openDrawer();
                },
              );
            },
          ),
          SizedBox(width: 0),
          IconButton(
            icon: Icon(
              Icons.notifications,
              size: 30,
            ),
            onPressed: () {},
          ),
          SizedBox(width: 0),
          IconButton(
            icon: Icon(
              Icons.search,
              size: 30,
            ),
            onPressed: () {},
          ),
        ],
      ),
      backgroundColor: Color(0xFF003C70),
    );
  }
}

class NavbarDrawer extends StatefulWidget {
  @override
  _NavbarDrawerState createState() => _NavbarDrawerState();
}

class _NavbarDrawerState extends State<NavbarDrawer> {
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
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          DrawerHeader(
            decoration: BoxDecoration(
              color: Color(0xFF003C70),
            ),
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  // صورة الملف الشخصي
                  GestureDetector(
                    onTap: _pickImage,  // تحديد صورة الملف الشخصي
                    child:CircleAvatar(
  radius: 35,
  backgroundImage: _pickedImage != null
      ? FileImage(_pickedImage!)
      : null, // Set backgroundImage to null if _pickedImage is null
  child: _pickedImage == null
      ? Icon(Icons.person, size: 50)  // Display a person icon if _pickedImage is null
      : null,  // No child when _pickedImage is not null
),



                  ),
                  SizedBox(height: 10),
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => Login(),
                        ),
                      );
                    },
                    child: ElevatedButton(
                      onPressed: () {
                        showDialog(
                          context: context,
                          builder: (BuildContext context) {
                            return AlertDialog(
                              backgroundColor: Color.fromARGB(255, 16, 54, 92),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10.0),
                              ),
                              title: Text(
                                'الملف الشخصي',
                                style: TextStyle(
                                  color: Colors.white,
                                ),
                                textAlign: TextAlign.right,
                              ),
                              content: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: <Widget>[
                                  SizedBox(
                                    width: double.infinity,
                                    child: ElevatedButton(
                                      onPressed: () {
                                        Navigator.push(
                                          context,
                                          SlidePageRoute(
                                            page: UserProfile(),
                                            animationDuration:
                                                Duration(seconds: 1),
                                            slideFromTop: true,
                                          ),
                                        );
                                      },
                                      style: ElevatedButton.styleFrom(
                                        primary: Color(0xFFAD8700),
                                        padding: EdgeInsets.all(16.0),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(
                                            10.0,
                                          ),
                                        ),
                                      ),
                                      child: Text(
                                        'البيانات الشخصية',
                                        style: TextStyle(
                                          fontSize: 14,
                                          color: Colors.white,
                                        ),
                                      ),
                                    ),
                                  ),
                                  SizedBox(height: 20),
                                  SizedBox(
                                    width: double.infinity,
                                    child: ElevatedButton(
                                      onPressed: () {
                                        Navigator.push(
                                          context,
                                          SlidePageRoute(
                                            page: RegisteredServices(),
                                            animationDuration:
                                                Duration(seconds: 1),
                                            slideFromTop: true,
                                          ),
                                        );
                                      },
                                      style: ElevatedButton.styleFrom(
                                        primary: Color(0xFFAD8700),
                                        padding: EdgeInsets.all(16.0),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(
                                            10.0,
                                          ),
                                        ),
                                      ),
                                      child: Text(
                                        'الخدمات التي قمت بالتسجيل بها',
                                        style: TextStyle(
                                          fontSize: 14,
                                          color: Colors.white,
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            );
                          },
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        primary: Color(0xFFAD8700),
                        minimumSize: Size(300, 0),
                      ),
                      child: Text(
                        'الملف الشخصي',
                        style: TextStyle(
                          fontSize: 16,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          ListTile(
            title: Text(
              'الرئيسية',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Color(0xFF003C70),
              ),
              textAlign: TextAlign.right,
            ),
            onTap: () {
              Navigator.pop(context);
              Navigator.push(
                context,
                SlidePageRoute(
                  page: Welcome(),
                  animationDuration: Duration(seconds: 1),
                  slideFromTop: true,
                ),
              );
            },
          ),
          ListTile(
            title: Text(
              'تواصل معنا',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Color(0xFF003C70),
              ),
              textAlign: TextAlign.right,
            ),
            onTap: () {
              //اضغط هنا تنلارتثق
            },
          ),
          ListTile(
            title: Text(
              'عن المكتبة',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Color(0xFF003C70),
              ),
              textAlign: TextAlign.right,
            ),
            onTap: () {
              Navigator.pop(context);
              Navigator.push(
                context,
                SlidePageRoute(
                  page: Aboutliberary(),
                  animationDuration: Duration(seconds: 1),
                  slideFromTop: true,
                ),
              );
            },
          ),

          ListTile(
            title: Text(
              'الخدمات',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Color(0xFF003C70),
              ),
              textAlign: TextAlign.right,
            ),
            onTap: () {
              Navigator.pop(context);
              Navigator.push(
                context,
                SlidePageRoute(
                  page: ServiceScreen(),
                  animationDuration: Duration(seconds: 1),
                  slideFromTop: true,
                ),
              );
            },
          ),
          ListTile(
            title: Text(
              'حالة الخدمات',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Color(0xFF003C70),
              ),
              textAlign: TextAlign.right,
            ),
            onTap: () {
              Navigator.pop(context);
              // يمكنك هنا تحديد التصرف عند الضغط على البند
            },
          ),
   
          ListTile(
            title: Text(
              'تسجيل خروج',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Color(0xFF003C70),
              ),
              textAlign: TextAlign.right,
            ),
            onTap: () {
              Navigator.pushAndRemoveUntil(
                context,
                SlidePageRoute(
                  page: Welcome(),
                  animationDuration: Duration(seconds: 1),
                  slideFromTop: true,
                ),((route) => false
              )
              );
              // يمكنك هنا تحديد التصرف عند الضغط على البند
            },
          ),
          // ... باقي العناصر هنا
        ],
      ),
    );
  }
}
