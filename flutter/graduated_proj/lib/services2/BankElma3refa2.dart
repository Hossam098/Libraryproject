// ignore_for_file: unused_import, unused_field

import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'dart:io';
import 'package:graduated_proj/menu/navbar.dart';

class BankElma3refa2 extends StatefulWidget {
  const BankElma3refa2({Key? key}) : super(key: key);

  @override
  _BankElma3refa2State createState() => _BankElma3refa2State();
}

class _BankElma3refa2State extends State<BankElma3refa2> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  List<File> _pickedFiles = [];
  TextEditingController _MarhalaController = TextEditingController();
  bool _isMarhalaEmpty = false;
  String? _selectedValue;
  bool _isMarhalaValid = true;


    TextEditingController _Sho3paController = TextEditingController();
  bool _isSho3paEmpty = false;

  bool _isSho3paValid = true;



  

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
   
        appBar: Navbar(),
        drawer: NavbarDrawer(),
        body: Container(
          decoration: BoxDecoration(
            color: Color.fromARGB(255, 255, 255, 255), // Main background color
          ),
          child: ListView(
            children: [
              // ... Previous widgets ...
              Align(
                alignment: Alignment.center,
                child: Image.asset(
                  'assets/images/Helwan_University.jpg', // استبدل بالمسار الصحيح والامتداد
                  width: 900,
                  height: 300,
                ),
              ),
              SizedBox(height: 60),

              Expanded(
                child: Container(
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: Color(0xFF003C70),
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(25),
                      topRight: Radius.circular(25),
                    ),
                  ),
                  child: Column(
                    children: [
                      Text(
                        'خدمة بنك المعرفة المصري ',
                        style: TextStyle(
                          fontSize: 26,
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          height: 4,
                          shadows: [
                            Shadow(
                              color: Colors.black,
                              offset: Offset(4, 4),
                              blurRadius: 4,
                            ),
                          ],
                        ),
                      ),
                    


                      Container(
                        width: double.infinity,
                        decoration: BoxDecoration(
                          color: Color(0xFF003C70),
                          borderRadius: BorderRadius.circular(25),
                        ),
                        child: Column(
                          children: [
                            Directionality(
  textDirection: TextDirection.rtl,
  child: TextField(
    controller: _MarhalaController,
    decoration: InputDecoration(
      labelText: 'المرحلة العلمية',
      labelStyle: TextStyle(
        fontSize: 25,
        color: Colors.white,
      ),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      errorText: _isMarhalaEmpty
          ? 'من فضلك املأ الحقل'
          : _isMarhalaValid
              ? null
              : 'اختر من القائمة من فضلك',
      suffixIcon: PopupMenuButton<String>(
        icon: Icon(
          Icons.arrow_drop_down,
          color: Colors.white,
        ),
        itemBuilder: (BuildContext context) {
          return [
            'الأولى',
            'الثانية',
            'الثالثة',
            'الرابعة',
          ].map((String value) {
            return PopupMenuItem<String>(
              value: value,
              child: Text(value),
            );
          }).toList();
        },
        onSelected: (String value) {
          setState(() {
            _selectedValue = value;
            _MarhalaController.text = value;
            _isMarhalaValid = true;
            _isMarhalaEmpty = false;
          });
        },
      ),
    ),
    onChanged: (value) {
      setState(() {
        _MarhalaController.text = value;
        _isMarhalaValid = [
          'الأولى',
          'الثانية',
          'الثالثة',
          'الرابعة',
        ].contains(value);
        _isMarhalaEmpty = value.isEmpty;
      });
    },
    style: TextStyle(
      color: Colors.white,
    ),
  ),
)

                          ],
                        ),
                      ),
                     
                     
                      SizedBox(
                        height: 50,
                      ),
                      Directionality(
  textDirection: TextDirection.rtl,
  child: TextField(
    controller: _Sho3paController,
    decoration: InputDecoration(
      labelText: 'الشعبة الدراسية',
      labelStyle: TextStyle(
        fontSize: 25,
        color: Colors.white,
      ),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      errorText: _isSho3paEmpty ? 'من فضلك املأ الحقل' : null,
    ),
    onChanged: (value) {
      setState(() {
        _isSho3paEmpty = value.isEmpty;
      });
    },
    style: TextStyle(
      color: Colors.white,
    ),
  ),
),

                       SizedBox(
                        height: 80,
                      ),
                      ElevatedButton(
                        onPressed: () {
                          // أضف الأكواد التي ترغب في تنفيذها عند النقر على الزرار هنا
                        },
                        child: Text(
                          'سجل الان',
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.white,
                          ),
                        ),
                        style: ElevatedButton.styleFrom(
                          primary: Color(0xFFAD8700),
                          padding: EdgeInsets.symmetric(
                              horizontal: 100, vertical: 10),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
                          ),
                        ),
                      ),
                      SizedBox(
                        height: 50,
                      ),
                    ],
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
