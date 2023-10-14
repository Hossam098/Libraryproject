import 'package:flutter/material.dart';
import 'dart:io';
import 'package:graduated_proj/menu/navbar.dart';



class RegisteredServices extends StatefulWidget {
  @override
  _RegisteredServicesState createState() => _RegisteredServicesState();
}

class _RegisteredServicesState extends State<RegisteredServices> {
  bool _showAdditionalContent = false; // Variable to control visibility

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
  title: Text('الخدمات التي قمت بالتسجيل بها'),
  backgroundColor: Color.fromARGB(255, 16, 54, 92),// يتم تعيين اللون الأصفر هنا
),

      body: Padding(
        padding: const EdgeInsets.only(top: 20, right: 20, left: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              decoration: BoxDecoration(
                color: Color(0xFF003C70),
                      borderRadius: BorderRadius.circular(10),
              ),
              padding: EdgeInsets.all(16.0),
              child: Table(
                border: TableBorder.all(
                  color: Colors.white,
                  width: 0.0,
                ),
                children: [
                    TableRow(
                    children: [
                      TableCell(
                        child: Center(
                          child: Text(
                            ' المزيد',
                            style: TextStyle(color: Color(0xFFAD8700),fontSize: 16)
                          ),
                        ),
                      ),
                      TableCell(
                        child: Center(
                          child: Text(
                            ' تاريخ التسجيل',
                            style: TextStyle(color: Color(0xFFAD8700),fontSize: 16)
                          ),
                        ),
                      ),
                      TableCell(
                        child: Center(
                          child: Text(
                            ' حاله الخدمة',
                            style: TextStyle(color: Color(0xFFAD8700),fontSize: 16)
                          ),
                        ),
                      ),
                      TableCell(
                        child: Center(
                          child: Text(
                            'اسم الخدمة',
                            style: TextStyle(color: Color(0xFFAD8700),fontSize: 16)
                          ),
                        ),
                      ),
                    ],
                  ),
                  TableRow(
                    children: [
                      TableCell(
                        child: Center(
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: ElevatedButton(
                              onPressed: () {
                                setState(() {
                                  _showAdditionalContent =
                                      !_showAdditionalContent;
                                });
                              },
                              style: ElevatedButton.styleFrom(
                                primary: Color(0xFFAD8700),
                              ),
                              child: Text(
                                'مزيد من التفاصيل',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 5,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                      TableCell(
                        child: Center(
                          child: Text(
                            ' 2023-10-09',
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                      ),
                      TableCell(
                        child: Center(
                          child: Text(
                            ' انتظار كود الدفع الخاص بالخدمه',
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                      ),
                      TableCell(
                        child: Center(
                          child: Text(
                            ' استخراج افادة بأن عنوان مخطط الرسالة ليس مسجل',
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            SizedBox(height: 40),
            _showAdditionalContent
                ? Container(
                  decoration: BoxDecoration(
                color: Color(0xFF003C70),
                      borderRadius: BorderRadius.circular(10),
              ),
                    padding: EdgeInsets.fromLTRB(
                      16.0,
                      16.0,
                      16.0,
                      32.0,
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          padding: EdgeInsets.only(bottom: 8.0),
                          child: Text(
                            'المرفقات المرسلة',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 24,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                        Container(
                          height: 2.0,
                          color: Colors.white,
                        ),
                        SizedBox(height: 180.0),
                        Text(
                          'الرد من المكتبة',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                          ),
                        ),
                      ],
                    ),
                  )
                : SizedBox(height: 30),
          ],
        ),
      ),
    );
  }
}


/*
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:graduated_proj/menu/navbar.dart';
void main() => runApp(RegisteredServices());

class RegisteredServices extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Table Example'),
        ),
        body: Center(
          child: Container(
            color: Color(0xFF003C70), // Background color for the table
            child: Table(
              // Border configuration
              border: TableBorder.all(
                color: Colors.white, // Border color
                width: 0.0, // Border width
              ),
              children: [
                TableRow(
                  children: [
                    TableCell(
                      child: Center(
                        child: Padding(
                          padding: const EdgeInsets.all(8.0), // Add padding to the button
                          child: ElevatedButton(
                            onPressed: () {
                              // Toggle the visibility of the additional content
                              setState(() {
                                _showAdditionalContent = !_showAdditionalContent;
                              });
                            },
                            style: ElevatedButton.styleFrom(
                              primary: Color(0xFFAD8700), // Button background color
                            ),
                            child: Text(
                              'مزيد من التفاصيل',
                              style: TextStyle(color: Colors.white, fontSize: 13),
                            ),
                          ),
                        ),
                      ),
                    ),
                    TableCell(
                      child: Center(
                        child: Text(' تاريخ التسجيل',  style: TextStyle(color: Colors.white,fontSize: 25),),
                      ),
                    ),
                    TableCell(
                      child: Center(
                        child: Text('حاله الخدمة ',  style: TextStyle(color: Colors.white,fontSize: 25),),
                      ),
                    ),
                    TableCell(
                      child: Center(
                        child: Text('اسم الخدمة ',  style: TextStyle(color: Colors.white,fontSize: 25),),
                      ),
                    ),
                  ],
                ),
                TableRow(
                  children: [
                    TableCell(
                      child: Center(
                        child: Text('وصف 1',  style: TextStyle(color: Colors.white),),
                      ),
                    ),
                    TableCell(
                      child: Center(
                        child: Text('وصف 2',  style: TextStyle(color: Colors.white),),
                      ),
                    ),
                    TableCell(
                      child: Center(
                        child: Text('وصف 3',  style: TextStyle(color: Colors.white),),
                      ),
                    ),
                    TableCell(
                      child: Center(
                        child: Text('وصف 4',
                        style: TextStyle(color: Colors.white),),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}*/