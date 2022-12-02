package OnlineShop;

public class Main {
    public static void main(String[] args) {


        Products product1 = new Products("Bugatti", "car", 10000000);
        Products product2 = new Products("Kawasaki", "bike", 150000);


        Admin admin1 = new Admin("Rafat");

        admin1.AddProducts(product1.Name, product1.Group, product1.Price);
        admin1.AddProducts(product2.Name, product2.Group, product2.Price);



        System.out.println("Admin1 Products");
        admin1.ViewProducts();
        Customer customer1 = new Customer("Rahat");


        customer1.AddToCart(product1);
        customer1.AddToCart(product2);


        customer1.ViewCartProducts();

        System.out.println();
        System.out.println("Total Price: " + customer1.cart.SumTotalPrice());


        customer1.payment.MakePayment(customer1.cart.SumTotalPrice());


        System.out.println("Guest Products");

        Guest guest1 = new Guest();
        guest1.ViewProducts(admin1);
        guest1.GetRegistered("Rafid");


    }
}