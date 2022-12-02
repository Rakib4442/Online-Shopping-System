package OnlineShop;

public class Products {

    public String Name;
    public String Group;
    static int productCount = 1;
    public int Id;
    public int Price;


    public void setId(int id) {
        Id = id;
    }

    public void setName(String name) {
        Name = name;
    }

    public void setGroup(String group) {
        Group = group;
    }

    public void setPrice(int price) {
        Price = price;
    }
    public Products(String name, String group, int price) {
        Id = productCount;
        Name = name;
        Group = group;
        Price = price;
        productCount++;
    }
}
