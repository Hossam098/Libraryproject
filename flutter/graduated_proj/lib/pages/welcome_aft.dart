import 'dart:io';
import 'package:flutter/material.dart';
import 'package:graduated_proj/menu/about_liberary.dart';
import 'package:graduated_proj/menu/service.dart';
import 'package:graduated_proj/pages/login.dart';
import 'package:graduated_proj/pages/signup.dart';
import 'package:graduated_proj/menu/navbar_aft.dart';
import 'package:graduated_proj/menu/contact.dart';

void main() {
  runApp(MaterialApp(
    home: welcome_aft(),
  ));
}

class welcome_aft extends StatefulWidget {
  @override
  _welcome_aftState createState() => _welcome_aftState();
}

class _welcome_aftState extends State<welcome_aft> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: Icon(
              Icons.close,
              size: 30,
            ),
            onPressed: () {
              exit(0);
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
        ),
        drawer: NavbarDrawer(),
        body: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                width: double.infinity,
                height: MediaQuery.of(context).size.height,
                child: Stack(
                  children: [
                    Image.asset(
                      "assets/images/WhatsApp Image 2023-08-10 at 01.01.55.jpg",
                      width: double.infinity,
                      height: MediaQuery.of(context).size.height,
                      fit: BoxFit.cover,
                    ),
                    Container(
                      width: double.infinity,
                      height: MediaQuery.of(context).size.height,
                      color: Colors.black.withOpacity(0.5),
                      child: Align(
                        alignment: AlignmentDirectional.topEnd,
                        child: Padding(
                          padding: const EdgeInsets.fromLTRB(16, 10, 16, 0),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text(
                                " المكتبة الرقمية",
                                style: TextStyle(
                                  fontSize: 30,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                                textAlign: TextAlign.end,
                              ),
                              Text(
                                "جامعة حلوان",
                                style: TextStyle(
                                  fontSize: 25,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                                textAlign: TextAlign.end,
                              ),
                              SizedBox(height: 20),
                              Text(
                                "احد مشاريع تطوير التعليم داخل الجامعة بهدف ميكنة مكتبات الجامعة وتطوير العمل بها واتاحة جميع مقتنيات وخدمات المكتبات في صورة رقمية، وذلك في إطار مشروع تطوير التعليم العالي في جمهورية مصر العربيه ",
                                style: TextStyle(
                                  fontSize: 17,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                                textAlign: TextAlign.end,
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                width: double.infinity,
                color: Color.fromARGB(255, 201, 199, 199),
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
              Container(
                width: double.infinity,
                color: const Color.fromARGB(255, 255, 255, 255),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(16, 10, 16, 10),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        "تقدم المكتبة الرقمية خدمات معلوماتية متميزة سواء لكليات/ معاهد الجامعة متمثلة في المكتبات الرقمية الفرعية في كل كلية، أو تمثيل الوحدة في لجان الجامعة المتعددة، بالإضافة إلى ذلك تقدم المكتبة خدمات مباشرة لأعضاء هيئة التدريس وطلاب الجامعة",
                        style: TextStyle(
                          fontSize: 18,
                          color: Color.fromARGB(255, 16, 54, 92),
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.right,
                      ),
                    ],
                  ),
                ),
              ),
              SizedBox(height: 10),

              _buildCustomContainer(
                context,
                Icons.check_circle_outline,
                'استخراج عنوان افادة بان عنوان مخطط الرسالة ليس مسجل',
                () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => Tasgeel(),
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
                    MaterialPageRoute(
                      builder: (context) => Tashkeel(),
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
                    MaterialPageRoute(
                      builder: (context) => fahsShakhsy(),
                    ),
                  ); // أضف هنا الإجراء الذي ترغب في تنفيذه عند الضغط على الزرار
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
                    MaterialPageRoute(
                      builder: (context) => FahsMagala(),
                    ),
                  ); // أضف هنا الإجراء الذي ترغب في تنفيذه عند الضغط على الزرار
                },
                'فحص الابحاث العلمية بغرض النشر في المجلات العلمية',
                22, // تعديل حجم الخط
                Color.fromARGB(255, 16, 54, 92), // تعديل لون النص
              ),
              SizedBox(height: 20),

              SizedBox(height: 50),
              Column(
                children: [
                  ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ContactPage(),
                        ),
                      ); // أضف هنا الإجراء الذي ترغب في تنفيذه عند الضغط على الزرار
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
                  Container(
                    width: double.infinity,
                    height: 2,
                    color: Colors.black, // لون الخط الأحمر
                  ),
                ],
              ),
              SizedBox(height: 25),
              Container(
                width: double.infinity,
                color: Color.fromARGB(255, 201, 199, 199),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(16, 10, 16, 10),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        " مجتمع المستفيدين",
                        style: TextStyle(
                          fontSize: 28,
                          color: Color.fromARGB(255, 16, 54, 92),
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.right,
                      ),
                    ],
                  ),
                ),
              ),
              Container(
                width: double.infinity,
                color: const Color.fromARGB(255, 255, 255, 255),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(16, 10, 16, 10),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        "تقدم المكتبة الرقمية خدمات معلوماتية متميزة سواء لكليات/ معاهد الجامعة متمثلة في المكتبات الرقمية الفرعية في كل كلية، أو تمثيل الوحدة في لجان الجامعة المتعددة، بالإضافة إلى ذلك تقدم المكتبة خدمات مباشرة لأعضاء هيئة التدريس وطلاب الجامعة",
                        style: TextStyle(
                          fontSize: 18,
                          color: Color.fromARGB(255, 16, 54, 92),
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.right,
                      ),
                    ],
                  ),
                ),
              ),

              Container(
                padding: EdgeInsets.all(10),
                width: 350,
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 176, 214, 245),
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
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        SizedBox(width: 10),
                        Expanded(
                          child: Text(
                            "هل لديك استفسار او شكوي او اقتراح ؟",
                            style: TextStyle(
                              fontSize: 0.06 *
                                  350, // تعديل حجم النص بناءً على عرض الكونتينر
                              color: Colors.black,
                              fontWeight: FontWeight.w900,
                            ),
                            textAlign: TextAlign.right,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 20),
                    Container(
                      height: 1,
                      width: double.infinity,
                      color: Colors.black,
                    ),
                    SizedBox(height: 10),
                    Text(
                      """
في حال اذا ما كان لديك استفسار او شكوي او حتي اقتراح لتحسين العمل في وحدة المكتبة الرقمية. وذلك بهدف تحسين العمل في الوحدة وتطوير الاداء وتقويمه وذلك للوصول الي مستوي خدمة نموذجي ومتميز
""",
                      style: TextStyle(
                        fontSize: 0.048 *
                            350, // تعديل حجم النص بناءً على عرض الكونتينر
                        color: Colors.black,
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.right,
                    ),
                    SizedBox(height: 2),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Image.asset(
                          'assets/images/qrcode.png', // استبدل بمسار صورتك الفعلي
                          width: 80, // تحديد عرض الصورة
                          height: 100, // تحديد ارتفاع الصورة
                        ),
                        SizedBox(width: 100),
                        ElevatedButton(
                          onPressed: () {
                            // الإجراء الذي يتم تنفيذه عند الضغط على الزرار
                          },
                          style: ElevatedButton.styleFrom(
                            primary: Color(0xFF003C70),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(25),
                            ),
                          ),
                          child: Text(
                            "اضغط هنا",
                            style: TextStyle(
                              fontSize: 0.048 *
                                  350, // تعديل حجم النص بناءً على عرض الكونتينر
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              )

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
