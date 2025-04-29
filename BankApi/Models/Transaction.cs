public class Transaction {
    public int Id { get; set; }
    public string SenderAccount { get; set; } = string.Empty;
    public string ReceiverAccount { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime Date { get; set; } = DateTime.Now;
}
