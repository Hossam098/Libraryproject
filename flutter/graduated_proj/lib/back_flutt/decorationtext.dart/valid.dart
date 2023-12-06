import 'message.dart';
validinput ( String val ,int min ,int max , [RegExp? mom ,String? moo]) {
if(val .length > max) {
  return "$messageinputmax $max" ;
}
if(val .isEmpty) {
  return"$messageinputempty";
}
if(val .length < min) {
  return "$messageinputmin $min" ;
}
if(mom != null &&mom.hasMatch(val) == false ){
return "$messageemail"; }

if(moo!=null && moo != val  ){
return "$messagepass"; }

}