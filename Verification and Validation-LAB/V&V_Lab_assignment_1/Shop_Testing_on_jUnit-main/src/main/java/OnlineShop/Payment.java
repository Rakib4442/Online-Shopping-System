package OnlineShop;

public class Payment {
    public int TotalPrice;

    public int MakePayment(int totalPrice){
        System.out.println("Total Price: " + totalPrice);

        return totalPrice;
    }
}
