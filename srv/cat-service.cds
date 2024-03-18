namespace myapp;

entity Users {
  key username: String(100);
  password: String(100);
}

// // OData 서비스 정의
// service MyService {
//   // Products 엔터티를 OData 서비스로 노출
//   entity Users as projection on myapp.Users;
// }

// namespace my.namespace;

// // HANA Cloud의 테이블을 기반으로 하는 엔터티 정의
// entity Products {
//   key ID : Integer;
//   name : String(100);
//   description : String(500);
//   price : Decimal(10, 2);
// }

// // OData 서비스 정의
// service MyService {
//   // Products 엔터티를 OData 서비스로 노출
//   entity Products as projection on my.namespace.Products;
// }