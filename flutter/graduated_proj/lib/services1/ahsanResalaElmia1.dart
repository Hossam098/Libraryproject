// ignore_for_file: unused_import

import 'package:flutter/material.dart';
import 'package:graduated_proj/pages/signup.dart';
import 'package:graduated_proj/pages/login.dart';

import 'package:graduated_proj/pages/welcome.dart';
import 'package:graduated_proj/services2/ahsanResalaElmia2.dart';


import 'dart:io';
import 'package:graduated_proj/menu/navbar.dart';
import 'package:graduated_proj/pages/userprofile.dart';

class AhsanResalaElmia1 extends StatelessWidget {
  const AhsanResalaElmia1({Key? key});

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
                              """    ١)  ارسال الخطاب الموجه الى مديرة وحدة المكتبة الرقمية ؛ بطلب فحص الابحاث العلمية معتمد ومختوم ومؤرخ بتاريخ حديث خاتم شعار الجمهورية (ختم النسر) مذكور فيه الآتي : اسم المتقدم - عنوان البحث كامل وتاريخ قبول النشر او تاريخ النشر - الكلية - الجامعة - القسم - البريد الالكتروني + رقم التليفون ورقم البطاقة كامل و صورة من جواز السفر (للوافدين فقط)      """,
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
                              """    ٢)  ارسال صورة ايصال الدفع)      """,
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
                              """   (WORD && PDF) ٣)  ارسال الابحاث بصيغة)       """,
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
                              """   ١)  لايوجد داعي ان يتوجه الباحث لمقر المكتبة الرقمية حيث سيتم ارسال الافادة له علي الموقع خلال 5 ايام عمل         """,
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
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => AhsanResalaElmia2(),
                            ),
                          ); // أضف الأكواد التي ترغب في تنفيذها عند النقر على الزرار هنا
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
