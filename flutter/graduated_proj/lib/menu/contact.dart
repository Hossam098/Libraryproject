import 'package:flutter/material.dart';
import 'dart:math';

void main() {
  runApp(ContactPage());
}

class ContactPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Rotating Circular Icons'),
        ),
        body: Center(
          child: CircularIconAnimation(),
        ),
      ),
    );
  }
}

class CircularIconAnimation extends StatefulWidget {
  @override
  _CircularIconAnimationState createState() => _CircularIconAnimationState();
}

class _CircularIconAnimationState extends State<CircularIconAnimation> {
  String selectedLabel = ''; // Store the selected label
  static const double circleRadius = 150.0;

  @override
  Widget build(BuildContext context) {
    double angle1 = 0;
    double angle2 = 2 * pi / 3;
    double angle3 = 4 * pi / 3;

    double centerX = circleRadius;
    double centerY = circleRadius;

    return Container(
      width: 2 * circleRadius,
      height: 2 * circleRadius,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(
          color: Colors.black,
          width: 2.0,
        ),
        color: Colors.red,
      ),
      child: Stack(
        children: [
          AnimatedBuilder(
            animation: AlwaysStoppedAnimation(0), // Dummy animation
            builder: (context, child) {
              return Stack(
                children: [
                  _buildCircularIcon(
                    Icons.person,
                    angle1,
                    centerX,
                    centerY,
                    'أعضاء هيئة التدريس',
                  ),
                  _buildCircularIcon(
                    Icons.school,
                    angle2,
                    centerX,
                    centerY,
                    'School',
                  ),
                  _buildCircularIcon(
                    Icons.search,
                    angle3,
                    centerX,
                    centerY,
                    'Search',
                  ),
                ],
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildCircularIcon(
      IconData icon, double angle, double centerX, double centerY, String label) {
    double iconSize = 40.0;  // حجم الأيقونة

    double x = centerX + circleRadius * cos(angle) - (iconSize / 2);
    double y = centerY + circleRadius * sin(angle) - (iconSize / 2);

    return Positioned(
      left: x,
      top: y,
      child: GestureDetector(
        onTap: () {
          _showIconName(label);
        },
        child: Column(
          children: [
            Container(
              width: iconSize,
              height: iconSize,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.white,
              ),
              child: Center(
                child: Icon(
                  icon,
                  size: 30,
                  color: Colors.blue,
                ),
              ),
            ),
            if (label == selectedLabel)
              SizedBox(height: 5),
            if (label == selectedLabel)
              Text(
                label,
                style: TextStyle(fontSize: 14),
              ),
          ],
        ),
      ),
    );
  }

  void _showIconName(String label) {
    setState(() {
      selectedLabel = label;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(label),
        duration: Duration(seconds: 2),
      ),
    );
  }
}
