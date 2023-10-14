import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'dart:io';
import 'package:graduated_proj/menu/navbar.dart';

class Almanh2 extends StatefulWidget {
  const Almanh2({Key? key}) : super(key: key);

  @override
  _Almanh2State createState() => _Almanh2State();
}

class _Almanh2State extends State<Almanh2> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  List<File> _pickedFiles = [];
  TextEditingController _ResearchController = TextEditingController();
  TextEditingController _MarhalaController = TextEditingController();
  bool _isResearchEmpty = false;
  String? _selectedValue;
  bool _isResearchValid = true;
  bool _isMarhalaEmpty = false;
  bool _isMarhalaValid = true;

  void _onFileIconTap() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles(
      allowMultiple: true,
      type: FileType.custom,
      allowedExtensions: ['pdf', 'doc', 'docx'], // Allow PDF, Word documents
    );

    if (result != null) {
      List<File> pickedFiles = result.paths.map((path) => File(path!)).toList();

      if (_pickedFiles.length + pickedFiles.length <= 10) {
        setState(() {
          _pickedFiles.addAll(pickedFiles);
        });
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              'لا يمكن رفع أكثر من 10 ملفات ',
              style: TextStyle(color: Colors.yellow),
            ),
            backgroundColor: Colors.black,
          ),
        );
      }
    }
  }


 
  bool _isPdfFile(File file) {
    String extension = file.path.split('.').last.toLowerCase();
    return extension == 'pdf';
  }


  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        key: _scaffoldKey,
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
                        'خدمة احسن رسالة علمية',
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
                            ),
                          ],
                        ),
                      ),
                      SizedBox(height: 30),
                      Container(
                        padding: EdgeInsets.only(
                            right: 15), // تحديد مسافة من اليمين بوحدة 20
                        child: Text(
                          'قرار لجنة المناقشة والحم المعتمد مختوم بختم النسر مذكور به عنوان الرسالة وتاريخ مناقشة الرسالة يسحب من خلال صورة واضحة بالموبايل',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.white,
                          ),
                          textAlign: TextAlign.right,
                        ),
                      ),
                      SizedBox(height: 20),
                      ElevatedButton(
                        onPressed: _onFileIconTap,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.cloud_upload), // أيقونة "upload"
                            SizedBox(
                                width: 8), // بعض المسافة بين النص والأيقونة
                            Text('اضف الملفات '),
                          ],
                        ),
                      ),
                      SizedBox(height: 20),
                      
                      ListView.builder(
                        shrinkWrap: true,
                        itemCount: _pickedFiles.length,
                        itemBuilder: (context, index) {
                          return ListTile(
                            leading: Icon(
                              Icons.file_present,
                              color: Colors.white,
                            ),
                            title: Text(
                              _pickedFiles[index].path.split('/').last,
                              style: TextStyle(
                                color: Colors.white,
                              ),
                            ),
                          );
                        },
                      ),
                      SizedBox(
                        height: 50,
                      ),
                      Container(
                        padding: EdgeInsets.only(
                            right: 15), // تحديد مسافة من اليمين بوحدة 20
                        child: Text(
                          'قرار لجنة المناقشة والحم المعتمد مختوم بختم النسر مذكور به عنوان الرسالة وتاريخ مناقشة الرسالة يسحب من خلال صورة واضحة بالموبايل',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.white,
                          ),
                          textAlign: TextAlign.right,
                        ),
                      ),
                      SizedBox(height: 20),
                      ElevatedButton(
                        onPressed: _onFileIconTap,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.cloud_upload), // أيقونة "upload"
                            SizedBox(
                                width: 8), // بعض المسافة بين النص والأيقونة
                            Text('اضف الملفات '),
                          ],
                        ),
                      ),
                      SizedBox(height: 20),
                      
                      ListView.builder(
                        shrinkWrap: true,
                        itemCount: _pickedFiles.length,
                        itemBuilder: (context, index) {
                          return ListTile(
                            leading: Icon(
                              Icons.file_present,
                              color: Colors.white,
                            ),
                            title: Text(
                              _pickedFiles[index].path.split('/').last,
                              style: TextStyle(
                                color: Colors.white,
                              ),
                            ),
                          );
                        },
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
