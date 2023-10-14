// ignore_for_file: prefer_const_literals_to_create_immutables, prefer_const_constructors, unused_import

import 'package:flutter/material.dart';
import 'package:graduated_proj/pages/signup.dart';
import 'package:graduated_proj/pages/login.dart';
import 'package:graduated_proj/pages/welcome.dart';

import 'dart:io';
import 'package:graduated_proj/menu/navbar.dart';
import 'package:graduated_proj/pages/userprofile.dart';
import 'package:graduated_proj/services1/ahsanResalaElmia1.dart';
import 'package:graduated_proj/services1/BankElma3refa1.dart';
import 'package:graduated_proj/services1/Almanh1.dart';
import '../menu/pageroute.dart';

void main() {
  runApp(MaterialApp(
    home: ServiceScreen(),
  ));
}

class ServiceScreen extends StatelessWidget {
  const ServiceScreen({Key? key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: Navbar(),
        drawer: NavbarDrawer(),
        body: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                width: double.infinity,
                color: Color.fromARGB(255, 226, 221, 221),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(16, 10, 16, 10),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        "الخدمات التي تقدمها المكتبة الرقمية",
                        style: TextStyle(
                          fontSize: 26,
                          color: Color.fromARGB(255, 16, 54, 92),
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.right,
                      ),
                    ],
                  ),
                ),
              ),
              SizedBox(height: 40),

              _buildCustomContainer(
                context,
                Icons.check_circle_outline,
                'استخراج عنوان افادة بان عنوان مخطط الرسالة ليس مسجل',
                () {
                  Navigator.push(
                              context,
                              SlidePageRoute(
                                page: Tasgeel(),
                                animationDuration: Duration(seconds: 2),
                                slideFromTop: true,
                              ),
                            );
                },
                'استخراج عنوان افادة بان عنوان مخطط الرسالة ليس مسجل',
                22, // تعديل حجم الخط
                Color.fromARGB(255, 16, 54, 92), // تعديل لون النص
              ),

              SizedBox(height: 20),

              _buildCustomContainer(
                context,
                Icons.check_circle_outline,
                'فحص الاقتباس من الرسائل العلمية لغرض التشكيل',
                () {
                 Navigator.push(
                              context,
                              SlidePageRoute(
                                page: Tashkeel(),
                                animationDuration: Duration(seconds: 2),
                                slideFromTop: true,
                              ),
                            );
                },
                'فحص الاقتباس من الرسائل العلمية لغرض التشكيل',
                22, // تعديل حجم الخط
                Color.fromARGB(255, 16, 54, 92), // تعديل لون النص
              ),
              SizedBox(height: 20),

              _buildCustomContainer(
                context,
                Icons.check_circle_outline,
                'فحص الانتاج العلمي لغرض الفحص الشخصي',
                () {
                  Navigator.push(
                              context,
                              SlidePageRoute(
                                page: fahsShakhsy(),
                                animationDuration: Duration(seconds: 2),
                                slideFromTop: true,
                              ),
                            );// أضف هنا الإجراء الذي ترغب في تنفيذه عند الضغط على الزرار
                },
                'فحص الانتاج العلمي لغرض الفحص الشخصي',
                22, // تعديل حجم الخط
                Color.fromARGB(255, 16, 54, 92), // تعديل لون النص
              ),
              SizedBox(height: 20),

              _buildCustomContainer(
                context,
                Icons.check_circle_outline,
                'فحص الابحاث العلمية بغرض النشر في المجلات العلمية',
                () {
                  Navigator.push(
                              context,
                              SlidePageRoute(
                                page: FahsMagala(),
                                animationDuration: Duration(seconds: 2),
                                slideFromTop: true,
                              ),
                            );// أضف هنا الإجراء الذي ترغب في تنفيذه عند الضغط على الزرار
                },
                'فحص الابحاث العلمية بغرض النشر في المجلات العلمية',
                22, // تعديل حجم الخط
                Color.fromARGB(255, 16, 54, 92), // تعديل لون النص
              ),
              SizedBox(height: 20),

              _buildCustomContainer(
                context,
                Icons.check_circle_outline,
                'فحص الابحاث العلمية لغرض الترقية',
                () {
                 Navigator.push(
                              context,
                              SlidePageRoute(
                                page: Tarqia(),
                                animationDuration: Duration(seconds: 2),
                                slideFromTop: true,
                              ),
                            ); // أضف هنا الإجراء الذي ترغب في تنفيذه عند الضغط على الزرار
                },
                'فحص الابحاث العلمية لغرض الترقية',
                22, // تعديل حجم الخط
                Color.fromARGB(255, 16, 54, 92), // تعديل لون النص
              ),
              SizedBox(height: 20),

              _buildCustomContainer(
                context,
                Icons.check_circle_outline,
                'فحص احسن رسالة علمية',
                () {
                 Navigator.push(
                              context,
                              SlidePageRoute(
                                page: AhsanResalaElmia1(),
                                animationDuration: Duration(seconds: 2),
                                slideFromTop: true,
                              ),
                            ); // أضف هنا الإجراء الذي ترغب في تنفيذه عند الضغط على الزرار
                },
                'فحص احسن رسالة علمية',
                22, // تعديل حجم الخط
                Color.fromARGB(255, 16, 54, 92), // تعديل لون النص
              ),

              // ... الأكواد السابقة للمستطيلات الأخرى

              SizedBox(height: 20),

              _buildCustomContainer(
                context,
                Icons.check_circle_outline,
                'خدمة المنح',
                () {
                  Navigator.push(
                              context,
                              SlidePageRoute(
                                page: Almanh1(),
                                animationDuration: Duration(seconds: 2),
                                slideFromTop: true,
                              ),
                            ); // أضف هنا الإجراء الذي ترغب في تنفيذه عند الضغط على الزرار
                },
                'خدمة المنح',
                22, // تعديل حجم الخط
                Color.fromARGB(255, 16, 54, 92), // تعديل لون النص
              ),
              SizedBox(height: 20),

              _buildCustomContainer(
                context,
                Icons.check_circle_outline,
                'خدمة بنك المعرفة',
                () {
                 Navigator.push(
                              context,
                              SlidePageRoute(
                                page: BankElma3refa1(),
                                animationDuration: Duration(seconds: 2),
                                slideFromTop: true,
                              ),
                            );// أضف هنا الإجراء الذي ترغب في تنفيذه عند الضغط على الزرار
                },
                'خدمة بنك المعرفة',
                22, // تعديل حجم الخط
                Color.fromARGB(255, 16, 54, 92), // تعديل لون النص
              ),
              SizedBox(height: 50),
              ElevatedButton(
                onPressed: () {
                  // أضف هنا الإجراء الذي ترغب في تنفيذه عند الضغط على الزرار
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color.fromARGB(255, 16, 54, 92),
                  minimumSize: Size(350, 50),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15),
                  ),
                  elevation: 0,
                ),
                child: Text(
                  'المزيد من الخدمات',
                  style: TextStyle(
                    fontSize: 18,
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              SizedBox(height: 50),

              // ... الأكواد السابقة للمستطيلات الأخرى

              // وهكذا للمستطيلات الأخرى
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCustomContainer(BuildContext context, IconData icon, String text,
      Function onPressed, String name, double fontSize, Color textColor) {
    return Container(
      padding: EdgeInsets.all(20),
      width: 350,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(25),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.9),
            spreadRadius: 5,
            blurRadius: 7,
            offset: Offset(7, 14),
          ),
        ],
      ),
      child: Column(
        children: [
          Text(
            name,
            style: TextStyle(
              fontSize: fontSize,
              color: textColor,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.right,
          ),
          SizedBox(height: 20),
          Container(
            height: 1,
            width: double.infinity,
            color: Colors.black,
          ),
          SizedBox(height: 10),
          Icon(
            icon,
            color: Color(0xFFAD8700),
          ),
          SizedBox(height: 10),
          Text(
            text,
            style: TextStyle(
              fontSize: 18,
              color: Color.fromARGB(255, 16, 54, 92),
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),
          ElevatedButton(
            onPressed: onPressed as void Function()?,
            style: ElevatedButton.styleFrom(
              backgroundColor: Color(0xFFAD8700),
              minimumSize: Size(100, 50),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15),
              ),
              elevation: 15,
            ),
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 10),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  SizedBox(width: 5),
                  Text(
                    'مزيد من التفاصيل',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////





class Tasgeel extends StatefulWidget {
  const Tasgeel({Key? key});

  @override
  State<Tasgeel> createState() => _TasgeelState();
}

class _TasgeelState extends State<Tasgeel> {
  File? _userImage;
  bool isDarkMode = false;

  

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Theme(
        data: isDarkMode ? ThemeData.dark() : ThemeData.light(),
        child: Scaffold(
          appBar: AppBar(
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
          ),
          drawer: Drawer(
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
                       
                        SizedBox(height: 9),
                        GestureDetector(
                          onTap: () {
                           Navigator.push(
                              context,
                              SlidePageRoute(
                                page: UserProfile(),
                                animationDuration: Duration(seconds: 2),
                                slideFromTop: true,
                              ),
                            );
                          },
                          child: ElevatedButton(
                            onPressed: () {
                              // إضافة الإجراء الذي تريده هنا
                            },
                            style: ElevatedButton.styleFrom(
                              primary: Color(0xFFAD8700),
                              minimumSize: Size(300, 0),
                               // لون الزرار الأصفر
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
                 
                // ... باقي العناصر هنا
              ],
            ),
            
          ),
        
          body: Column(
            // ... باقي العناصر الأخرى في الصفحة ...
          ),
        ),
      ),
    );
  }
}





///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////
class Tashkeel extends StatelessWidget {
  const Tashkeel({Key? key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: Navbar(),
        drawer: NavbarDrawer(),
        body: Container(
          decoration: BoxDecoration(
            color: Color.fromARGB(255, 255, 255, 255), // لون الخلفية الأساسي
          ),
          child: ListView(
            children: [
              // ... الأكواد السابقة للمستطيلات الأخرى

              // وهنا يمكنك وضع الصورة
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
                      topLeft: Radius.circular(15),
                      topRight: Radius.circular(15),
                      
                    ),
                  ),
                  child: Column(
                    children: [
                      Text(
                        'فحص الاقتباس من الرسائل العلمية لغرض التشكيل ',
                        style: TextStyle(
                          fontSize: 15,
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
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              'خطوات الخدمة',
                              style: TextStyle(
                                fontSize: 14,
                                color: Color(0xFFAD8700), // لون النص الذهبي
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """    ١)  ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فحص الابحاث العلمية معتمد  ومؤرخ بتاريخ حديث خاتم من وكيل الكلية للدراسات العليا والبحوث والمنتسب اليها طالب الدراسات العليا بالجامعة ومختوم (خاتلم شعار الجمهورية(ختم النسر))  مذكور فيه الاتي  """,
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                fontSize: 13, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """    ١-  بيانات الباحث المتقدم : اسم الباحث كامل - الكلية - القسم - البريد الالكتروني الجامعي - رقم الموبايل """,
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                fontSize: 13, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """    ٢-  بيانات الرسالة العلمية : عنوان الرسالة كامل  باللغة العربية والانجليزية - ماجيستير او دكتوراه  """,
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                 fontSize: 13, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      SizedBox(height: 6),
                      Align(
                        alignment: AlignmentDirectional.topEnd,
                        child: Container(
                          color: Color(0xFFAD8700),
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(
                                      "iThenticate ويتم ذلك من خلال برنامج ال",
                                      style: TextStyle(
                                        fontSize: 13,
                                        color: Colors.white,
                                      ),
                                    ),
                                  ],
                                ),
                                SizedBox(height: 0), // ترك مسافة بين النصوص
                              ],
                            ),
                          ),
                        ),
                      ),
                      SizedBox(height: 6),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              "٢) اختار المرحلة العلمية (ماجيستير- دكتوراه)",
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتا رقم    علي البرنامج fcr""",
                              style: TextStyle(
                                 fontSize: 13, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              "***  انتظار كود الدفع الخاص بالخدمة  ***",
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                 fontSize: 12, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                                """ ٣)  ارسال صورة ايصال الدفع          """,
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                 fontSize: 13, // ارسال صورة ايصال الدف  تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """ ٤)  الرسالة المقدمة للفحص          """,
                              //ا
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                 fontSize: 13, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """  كاملة بملف واحد مجمع دون حذف اي اجزاء بصيغة """,
                              //الابحاث كاملة بملف واحد مجمع دون حذف اي اجزاء من
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                 fontSize: 13, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """ قابلة للنسخ هذا لكل الكليات pdf Image وليست  (WORD && PDF)""",
                              //الابحاث كاملة بملف واحد مجمع دون حذف اي اجزاء من
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                fontSize:
                                    12, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """ فيما عدا كليات علوم وصيدلة واقتصاد منزلي يتم حذف ال""",
                              //الابحاث كاملة بملف واحد مجمع دون حذف اي اجزاء من
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                fontSize:
                                    13, //methods & matrial تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """  methods & matrial""",
                              //الابحاث كاملة بملف واحد مجمع دون حذف اي اجزاء من
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                fontSize:
                                    13, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """ ٥) النموذج الخاص بفحص اقتباس الرسائل العلمية لغرض التشكيل   """,
                              //ا
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                 fontSize: 13, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              ' ملحوظة هامة',
                              style: TextStyle(
                                fontSize: 13,
                                color: Color(0xFFAD8700), // لون النص الذهبي
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """   ١)  لايوجد داعي ان يتوجه الباحث لمقر المكتبة الرقمية حيث سيتم ارسال الافادة له علي الموقع خلال 7 ايام عمل (لا تحسب الجمعة والسبت وايام الاجازات الرسمية) وطباعتها لتوقيعها وختمها من وكيل الكلية للدراسات العليا بالكلية المنتسب اليها    """,
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                 fontSize: 13, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Color(0xFFAD8700),
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """   ٢)  ولأي استفسارات اخري يرجي مراسلاتنا عبر لينك الشكاوي في الصفحة الرئيسية          """,
                              style: TextStyle(
                                 fontSize: 13, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Color(0xFFAD8700),
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """ يتم التوجه بالكود لاقرب فرع مصاري ممكن او البريد او اي مكان يقبل الكود ماعدا فوري و امان لدفع الرسوم الخاصة بالفحص لطلاب الدراسات العليا (الماجيستير والدكتوراه) داخل جامعة حلوان """,
                              style: TextStyle(
                                 fontSize: 13, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),

                      /**/

                      SizedBox(
                        height: 50,
                      ),
                      ElevatedButton(
                        onPressed: () {
                          // أضف الأكواد التي ترغب في تنفيذها عند النقر على الزرار هنا
                        },
                        child: Text(
                          'سجل الان',
                          style: TextStyle(
                            fontSize: 15,
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

  Widget _buildCustomContainer(
    BuildContext context,
    IconData icon,
    String text,
    Function onPressed,
    String name,
    double fontSize,
    Color textColor,
  ) {
    return Container(
      padding: EdgeInsets.all(20),
      width: 350,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(25),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.9),
            spreadRadius: 5,
            blurRadius: 7,
            offset: Offset(7, 14),
          ),
        ],
      ),
      child: Column(
        children: [
          Text(
            name,
            style: TextStyle(
              fontSize: fontSize,
              color: textColor,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.right,
          ),
          SizedBox(height: 20),
          Container(
            height: 1,
            width: double.infinity,
            color: Colors.black,
          ),
          SizedBox(height: 10),
          Icon(
            icon,
            color: Color(0xFFAD8700),
          ),
          SizedBox(height: 10),

          // ... باقي الويدجتات هنا ...
        ],
      ),
    );
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class FahsMagala extends StatelessWidget {
  const FahsMagala({Key? key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: Navbar(),
        drawer: NavbarDrawer(),
        body: Container(
          decoration: BoxDecoration(
            color: Color.fromARGB(255, 255, 255, 255), // لون الخلفية الأساسي
          ),
          child: Column(
            children: [
              // ... الأكواد السابقة للمستطيلات الأخرى

              // وهنا يمكنك وضع الصورة
              Align(
                alignment: Alignment.center,
                child: Image.asset(
                  'assets/images/Helwan_University.jpg', // استبدل بالمسار الصحيح والامتداد
                  width: 200,
                  height: 200,
                ),
              ),
              // ... الأكواد السابقة للمستطيلات الأخرى

              // وهكذا للمستطيلات الأخرى
              SizedBox(height: 60),

              Expanded(
                child: Container(
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: Color(0xFF003C70),
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(40),
                      topRight: Radius.circular(40),
                    ),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'خدمة فحص مجلة',
                        style: TextStyle(
                          fontSize: 26,
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          height: 2,
                          shadows: [
                            Shadow(
                              color: Colors.black, // لون الظل
                              offset:
                                  Offset(4, 4), // الانحناء الأفقي والرأسي للظل
                              blurRadius: 4, // نسبة ضبابية الظل
                            ),
                          ],
                        ),
                      ),
                      SizedBox(height: 270),
                      ElevatedButton(
                        onPressed: () {
                          // أضف الأكواد التي ترغب في تنفيذها عند النقر على الزرار هنا
                        },
                        child: Text(
                          ' سجل الان',
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.white,
                          ),
                        ),
                        style: ElevatedButton.styleFrom(
                          primary: Color(0xFFAD8700), // لون أصفر
                          padding: EdgeInsets.symmetric(
                              horizontal: 100, vertical: 10),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
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
      ),
    );
  }

  Widget _buildCustomContainer(
    BuildContext context,
    IconData icon,
    String text,
    Function onPressed,
    String name,
    double fontSize,
    Color textColor,
  ) {
    return Container(
      padding: EdgeInsets.all(20),
      width: 350,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(25),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.9),
            spreadRadius: 5,
            blurRadius: 7,
            offset: Offset(7, 14),
          ),
        ],
      ),
      child: Column(
        children: [
          Text(
            name,
            style: TextStyle(
              fontSize: fontSize,
              color: textColor,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.right,
          ),
          SizedBox(height: 20),
          Container(
            height: 1,
            width: double.infinity,
            color: Colors.black,
          ),
          SizedBox(height: 10),
          Icon(
            icon,
            color: Color(0xFFAD8700),
          ),
          SizedBox(height: 10),

          // ... باقي الويدجتات هنا ...
        ],
      ),
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Tarqia extends StatelessWidget {
  const Tarqia({Key? key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: Navbar(),
        drawer: NavbarDrawer(),
        body: Container(
          decoration: BoxDecoration(
            color: Color.fromARGB(255, 255, 255, 255), // لون الخلفية الأساسي
          ),
          child: Column(
            children: [
              // ... الأكواد السابقة للمستطيلات الأخرى

              // وهنا يمكنك وضع الصورة
              Align(
                alignment: Alignment.center,
                child: Image.asset(
                  'assets/images/Helwan_University.jpg', // استبدل بالمسار الصحيح والامتداد
                  width: 200,
                  height: 200,
                ),
              ),
              // ... الأكواد السابقة للمستطيلات الأخرى

              // وهكذا للمستطيلات الأخرى
              SizedBox(height: 60),

              Expanded(
                child: Container(
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: Color(0xFF003C70),
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(40),
                      topRight: Radius.circular(40),
                    ),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'خدمة الترقية',
                        style: TextStyle(
                          fontSize: 26,
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          height: 2,
                          shadows: [
                            Shadow(
                              color: Colors.black, // لون الظل
                              offset:
                                  Offset(4, 4), // الانحناء الأفقي والرأسي للظل
                              blurRadius: 4, // نسبة ضبابية الظل
                            ),
                          ],
                        ),
                      ),
                      SizedBox(height: 270),
                      ElevatedButton(
                        onPressed: () {
                          // أضف الأكواد التي ترغب في تنفيذها عند النقر على الزرار هنا
                        },
                        child: Text(
                          ' سجل الان',
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.white,
                          ),
                        ),
                        style: ElevatedButton.styleFrom(
                          primary: Color(0xFFAD8700), // لون أصفر
                          padding: EdgeInsets.symmetric(
                              horizontal: 100, vertical: 10),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
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
      ),
    );
  }

  Widget _buildCustomContainer(
    BuildContext context,
    IconData icon,
    String text,
    Function onPressed,
    String name,
    double fontSize,
    Color textColor,
  ) {
    return Container(
      padding: EdgeInsets.all(20),
      width: 350,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(25),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.9),
            spreadRadius: 5,
            blurRadius: 7,
            offset: Offset(7, 14),
          ),
        ],
      ),
      child: Column(
        children: [
          Text(
            name,
            style: TextStyle(
              fontSize: fontSize,
              color: textColor,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.right,
          ),
          SizedBox(height: 20),
          Container(
            height: 1,
            width: double.infinity,
            color: Colors.black,
          ),
          SizedBox(height: 10),
          Icon(
            icon,
            color: Color(0xFFAD8700),
          ),
          SizedBox(height: 10),

          // ... باقي الويدجتات هنا ...
        ],
      ),
    );
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

class fahsShakhsy extends StatelessWidget {
  const fahsShakhsy({Key? key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: Navbar(),
        drawer: NavbarDrawer(),
        body: Container(
          decoration: BoxDecoration(
            color: Color.fromARGB(255, 255, 255, 255), // لون الخلفية الأساسي
          ),
          child: ListView(
            children: [
              // ... الأكواد السابقة للمستطيلات الأخرى

              // وهنا يمكنك وضع الصورة
              Align(
                alignment: Alignment.center,
                child: Image.asset(
                  'assets/images/Helwan_University.jpg', // استبدل بالمسار الصحيح والامتداد
                  width: 900,
                  height: 300,
                ),
              ),
              // ... الأكواد السابقة للمستطيلات الأخرى

              // وهكذا للمستطيلات الأخرى
              SizedBox(height: 60),

              Expanded(
                child: Container(
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: Color(0xFF003C70),
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(25),
                      topRight: Radius.circular(25),
                      bottomLeft: Radius.circular(25),
                      bottomRight: Radius.circular(100),
                    ),
                  ),
                  child: Column(
                    children: [
                      Text(
                        'فحص الانتاج العلمي لغرض الفحص الشخصي ',
                        style: TextStyle(
                          fontSize: 22,
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
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              'خطوات الخدمة',
                              style: TextStyle(
                                fontSize: 26,
                                color: Color(0xFFAD8700), // لون النص الذهبي
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """    ١)  ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فحص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث  من وكيل الكلية للدراسات العليا والبحوث المنتسب اليها عضو هيئة التدريس بالجامعة ومختوم (خاتم شعار الجمهورية (ختم النسر))      """,
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                fontSize: 0.048 *
                                    350, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment: AlignmentDirectional.topEnd,
                        child: Container(
                          color: Color(0xFFAD8700),
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(
                                      "iThenticate ويتم ذلك من خلال برنامج ال",
                                      style: TextStyle(
                                        fontSize: 0.048 * 350,
                                        color: Colors.white,
                                      ),
                                    ),
                                  ],
                                ),
                                SizedBox(height: 0), // ترك مسافة بين النصوص
                              ],
                            ),
                          ),
                        ),
                      ),
                      SizedBox(height: 6),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """    ٢)  التسجيل لطلب كود الدفع)      """,
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                fontSize: 0.048 *
                                    350, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              "*** انتظار كود الدفع الخاص  بالخدمة***",
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                fontSize: 0.048 *
                                    350, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """    ٣)  ارسال صورة ايصال الدفع)      """,
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                fontSize: 0.048 *
                                    350, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """   (WORD && PDF) ٤)  ارسال الابحاث بصيغة)       """,
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                fontSize: 0.048 *
                                    350, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """    ٥)  تاريخ  قبول نشر الابحاث او تاريخ النشر ان وجد)      """,
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                fontSize: 0.048 *
                                    350, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              ' ملحوظة هامة',
                              style: TextStyle(
                                fontSize: 26,
                                color: Color(0xFFAD8700), // لون النص الذهبي
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """   ١)  لايوجد داعي ان يتوجه الباحث لمقر المكتبة الرقمية حيث سيتم ارسال الافادة له علي الموقع خلال 3 ايام عمل         """,
                              // """ لا   ) : ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)   علي البرنامج fcr""",
                              style: TextStyle(
                                fontSize: 0.048 *
                                    350, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Color(0xFFAD8700),
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """   ٢)  ولأي استفسارات اخري يرجي مراسلاتنا عبر لينك الشكاوي في الصفحة الرئيسية          """,
                              style: TextStyle(
                                fontSize: 0.048 *
                                    350, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Color(0xFFAD8700),
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),
                      Align(
                        alignment:
                            AlignmentDirectional.topEnd, // لليمين من أعلى
                        child: Container(
                          // لون الخلفية الأزرق
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              """يتم التوجه بالكود لاقرب فرع مصاري ممكن او البريد او اي مكان يقبل الكود ماعدا فوري و امان لدفع الرسوم الخاصة بالفحص""",
                              style: TextStyle(
                                fontSize: 0.048 *
                                    350, // تعديل حجم النص بناءً على عرض الكونتينر
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ),
                      ),

                      /**/

                      SizedBox(
                        height: 50,
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
              SizedBox(
                height: 50,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCustomContainer(
    BuildContext context,
    IconData icon,
    String text,
    Function onPressed,
    String name,
    double fontSize,
    Color textColor,
  ) {
    return Container(
      padding: EdgeInsets.all(20),
      width: 350,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(25),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.9),
            spreadRadius: 5,
            blurRadius: 7,
            offset: Offset(7, 14),
          ),
        ],
      ),
      child: Column(
        children: [
          Text(
            name,
            style: TextStyle(
              fontSize: fontSize,
              color: textColor,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.right,
          ),
          SizedBox(height: 20),
          Container(
            height: 1,
            width: double.infinity,
            color: Colors.black,
          ),
          SizedBox(height: 10),
          Icon(
            icon,
            color: Color(0xFFAD8700),
          ),
          SizedBox(height: 10),

          // ... باقي الويدجتات هنا ...
        ],
      ),
    );
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

