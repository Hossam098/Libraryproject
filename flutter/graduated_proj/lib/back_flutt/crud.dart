import 'dart:convert';

import 'package:http/http.dart' as http;

class crud {
  getreq(String url) async {
    try {
      var response = await http.get(Uri.parse(url));
      if (response.statusCode == 200) {
        var resbody = jsonDecode(response.body);
        return resbody;
      } else {
        print("error ${response.statusCode}");
      }
    } catch (e) {
      print("error catch $e");
    }
  }

  postreq(String url, Map data) async {
    try {
      var response = await http.post(Uri.parse(url), body: data);
        var resbody = jsonDecode(response.body);
        return resbody;
 
    } catch (e) {
      print("error catch $e");
    }
  }


  putreq(String url, Map data) async {
    try {
      var response = await http.put(Uri.parse(url), body: data);
        var resbody = jsonDecode(response.body);
        return resbody;
 
    } catch (e) {
      print("error catch $e");
    }
  }}