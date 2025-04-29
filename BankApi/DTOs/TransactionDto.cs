public class TransactionDto {
    public string SenderAccount { get; set; } = string.Empty;
    public string ReceiverAccount { get; set; } = string.Empty;
    public decimal Amount { get; set; }
}
