public class Basket
{
    public int Id { get; set; }
    public string BuyerId { get; set; }
    public List<BasketItem> Items { get; set; } = new();
    public void AddItem(Product product, int quantity)
    {
        var item = Items.FirstOrDefault(x => x.ProductId == product.Id);
        if (item == null)
        {
            item = new BasketItem
            {
                Product = product,
                Quantity = quantity
            };
            Items.Add(item);
        }
        else
        {
            item.Quantity += quantity;
        }
    }

    public void RemoveItem(int productId, int quantity)
    {
        var item = Items.FirstOrDefault(x => x.ProductId == productId);
        if (item == null) return;
        if (item.Quantity > quantity)
        {
            item.Quantity -= quantity;
        }
        else
        {
            Items.Remove(item);
        }
    }
}