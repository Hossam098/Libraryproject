// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables, dead_code, unused_import

import 'dart:io';
import 'package:flutter/material.dart';
import 'package:graduated_proj/menu/about_liberary.dart';
import 'package:graduated_proj/menu/service.dart';
import 'package:graduated_proj/pages/login.dart';
import 'package:graduated_proj/pages/signup.dart';
import 'package:graduated_proj/pages/welcome.dart';
import 'package:graduated_proj/menu/navbar.dart';

void main() {
  runApp(MaterialApp(
    home: Aboutliberary(),
  ));
}

class Aboutliberary extends StatelessWidget {
  const Aboutliberary({Key? key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar:Navbar(),
         drawer: NavbarDrawer(),
         
        body: Container(
          color: Color.fromARGB(255, 245, 254, 255), // تعديل لون الخلفية للصفحة
          child: SingleChildScrollView(
            child: Column(
              children: [
                Container(
                  width: double.infinity,
                  color: Color.fromARGB(255, 245, 254, 255),
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(16, 10, 16, 10),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        SizedBox(height: 30),
                        Text(
                          "عن المكتبة الرقمية",
                          style: TextStyle(
                            fontSize: 30,
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                            shadows: [
                              Shadow(
                                color: Colors.grey, // لون الظل
                                offset: Offset(2,
                                    2), // إزاحة الظل بالنسبة للنص (العرض، الارتفاع)
                                blurRadius:
                                    4, // نصف قطر التموج (التموج الضبابي للظل)
                              ),
                            ],
                          ),
                          textAlign: TextAlign.right,
                        )
                      ],
                    ),
                  ),
                ),

                Padding(
                  padding: const EdgeInsets.fromLTRB(16, 10, 16, 10),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        "تقدم المكتبة الرقمية خدمات معلوماتية متميزة سواء لكليات/ معاهد الجامعة متمثلة في المكتبات الرقمية الفرعية في كل كلية، أو تمثيل الوحدة في لجان الجامعة المتعددة، بالإضافة إلى ذلك تقدم المكتبة خدمات مباشرة لأعضاء هيئة التدريس وطلاب الجامعة",
                        style: TextStyle(
                          fontSize: 20,
                          color: Colors.black,
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.right,
                      ),
                    ],
                  ),
                ),

                SizedBox(height: 10),

                SizedBox(height: 20),

                SizedBox(height: 20),

                _buildCustomContainer(
                  context,
                  Icons.check_circle_outline,

                  """
١. مشاركة المصادر الرقمية واتاحتها
٢. رقمنة المصادر الورقية التي تنتجها الجامعة  
٣. مساندة منظومة التعليم والبحث بالجامعة
٤. الارتقاء بمستوى البحث العلمي بالجامعة
٥. تعزيز النزاهة الأكاديمية وتجنب الانتحال
٦. بناء بيئة رقمية تواكب التطورات التقنية
٧. تعزيز الوعي المعلوماتي والوصول الحر
٨. نشر ثقافة الاستدامة وربطها بالبحث
٩. تنفيذ قرارات المجلس الأعلى المتعلقة بالمكتبات الرقمية

  """,
                  () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => fahsShakhsy(),
                      ),
                    ); // أضف هنا الإجراء الذي ترغب في تنفيذه عند الضغط على الزرار
                  },
                  'اهدافنا', // تعديل نص العنوان
                  26, // تعديل حجم الخط
                  Color(0xFFAD8700), // تعديل لون النص
                ),
                SizedBox(height: 40),
                _buildCustomContainer(
                  context,
                  Icons.check_circle_outline,

                  """
رؤيتنا : التطلع نحو زيادة عالمية في إتاحة مصادر وخدمات المعلومات ودعم مجتمع البحث العلمي بما يتناسب مع متطلبات البيئة الرقمية الجديدة وتحديات القرن الواحد والعشرين 


رسالتنا : التكامل مع مؤسسات المعلومات بالتعليم العالي تحت مظلة المكتبة الرقمية بالمجلس الأعلى للجامعات من خلال توحيد سياسات العمل بالمكتبات الجامعية وتوفير قناة موحدة لتقديم كافة الخدمات المعلوماتية لمجتمع المستفيدين بمنظومة التعليم العالي
  """,
                  () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => fahsShakhsy(),
                      ),
                    ); // أضف هنا الإجراء الذي ترغب في تنفيذه عند الضغط على الزرار
                  },
                  'رسالتنا', // تعديل نص العنوان
                  26, // تعديل حجم الخط
                  Color(0xFFAD8700), // تعديل لون النص
                ),
                SizedBox(height: 40),
                _buildCustomContainer(
                  context,
                  Icons.check_circle_outline,

                  """
احد مشاريع تطوير التعليم داخل الجامعة بهدف ميكنة مكتبات الجامعة وتطوير العمل بها واتاحة جميع مقتنيات وخدمات المكتبات في صورة رقمية، وذلك في إطار مشروع تطوير التعليم العالي في جمهورية مصر العربية
  """,
                  () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => fahsShakhsy(),
                      ),
                    ); // أضف هنا الإجراء الذي ترغب في تنفيذه عند الضغط على الزرار
                  },
                  'من نحن', // تعديل نص العنوان
                  26, // تعديل حجم الخط
                  Color(0xFFAD8700), // تعديل لون النص
                ),
                SizedBox(height: 50),
                // Inside the build method of the Aboutliberary class
                Column(
                  children: [
                    // ... Existing content

                    // Add a new blue box with the same content as the first box
                    SizedBox(height: 20),
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
                fontSize: 0.06 * 350, // تعديل حجم النص بناءً على عرض الكونتينر
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
          fontSize: 0.048 * 350, // تعديل حجم النص بناءً على عرض الكونتينر
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
                fontSize: 0.048 * 350, // تعديل حجم النص بناءً على عرض الكونتينر
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


                    // ... Existing content
                  ],
                )

                // ... الأكواد السابقة للمستطيلات الأخرى

                // وهكذا للمستطيلات الأخرى
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildCustomContainer(BuildContext context, IconData icon, String text,
      Function onPressed, String name, double fontSize, Color textColor) {
    return Container(
      padding: EdgeInsets.all(10),
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
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Icon(
                icon,
                color: Color(0xFFAD8700),
              ),
              SizedBox(width: 10), // تعديل المسافة بين العلامة والنص
              Text(
                name,
                style: TextStyle(
                  fontSize: fontSize,
                  color: textColor,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.right,
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
            text,
            style: TextStyle(
              fontSize: 18,
              color: Colors.black,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.right,
          ),
          SizedBox(height: 10),

          // ... الأكواد الأخرى
        ],
      ),
    );
  }
}
