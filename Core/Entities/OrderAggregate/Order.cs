using System;
using System.Collections.Generic;

namespace Core.Entities.OrderAggregate
{
    public class Order : BaseEntity
    {
        public Order()
        {
        }

        public Order(
            IReadOnlyList<OrderItem> orderItems,
            string buyerEmail,
            Address shipToAddress,
            DeliveryMethod deliveryMethod,
            decimal subTotal,
            string paymentIntentId)
        {
            OrderItems = orderItems;
            BuyerEmail = buyerEmail;
            ShipToAddress = shipToAddress;
            DeliveryMethod = deliveryMethod;
            SubTotal = subTotal;
            PaymentIntentId = PaymentIntentId;
        }

        public string BuyerEmail { get; set; }

        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
        
        public Address ShipToAddress { get; set; }
        
        public DeliveryMethod DeliveryMethod { get; set; }
        
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        
        public decimal SubTotal { get; set; }
        
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        
        public string PaymentIntentId { get; set; }
        
        public decimal GetTotal() 
        {
            decimal total = SubTotal + DeliveryMethod.Price;
            return total;
        }
    }
}