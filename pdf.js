var pdf = require('html-pdf')
var fs = require('fs')
const { table } = require('console')
var options = { width: '56mm', border: '5mm' }

var html = ""

function getPdf(data) {

    let items = []
    let totalItems = 0
    let totalAmt = 0

    data['sno'].forEach((item, index) => {
        console.log(item)
        items.push({
            'sno': item,
            'item': data['item'][index],
            'priceu': data['priceu'][index],
            'qty': data['qty'][index],
            'gst': data['gst'][index],
            'amount': data['amount'][index]
        })
    })


    var table = '<center><table style="text-align:center;width:95%;font-weight: bold;"><thead><tr><th colspan="6">Tandoor Hut</th></tr></thead><tbody><tr></tr><tr></tr><tr><td colspan="6">Godhana Road Ara<br>Phone No. 7279855969<br>Email: tandoorhutata@gmail.com<br>GSTIN:10HIAPK7037L1ZA<br>State: 10-Bihar</td></tr><tr></tr><tr></tr><tr><td colspan="6">TAX INVOICE</td></tr><tr></tr><tr></tr><tr><td colspan="3"></td><td colspan="2">Invoice No.</td><td>' + data['bill_no'] + '</td></tr><tr><td colspan="3"></td><td colspan="2">Date</td><td>' + data['date'] + '</td></tr><tr><td colspan="6"></td></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr><td>#</td><td colspan=2>Item Name</td><td>Price/U</td><td>Quantity</td><td>Amount</td></tr>'
    items.forEach(item => {
        table += `<tr> <td>${item.sno}</td> <td colspan=2>${item.item}</td> <td>${item.priceu}</td> <td>${item.qty}</td><td>${item.amount}</td> </tr>`
    })

    table += '<tr></tr><tr></tr><tr><td colspan="2">Total</td><td></td><td></td><td>' + data['total_qty'] + '</td><td>' + data['total_amt'] + '</td></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr><td></td><td></td><td></td><td colspan="2">Sub Total</td><td>' + data['subtotal'] + '</td></tr><tr><td colspan="2">Bill To:</td><td>' + data['bill_to'] + '</td><td colspan="2">CGST</td><td>' + data['cgst'] + '</td></tr><tr><td></td><td>Mob No.</td><td>' + data['mob_no'] + '</td><td colspan="2">SGST</td><td>' + data['sgst'] + '</td></tr><tr><td></td><td></td><td></td><td colspan="2">Total</td><td>' + data['total'] + '</td></tr><tr><td></td><td></td><td></td><td colspan="2"></td><td></td></tr><tr><td></td><td></td><td></td><td colspan="2"></td><td></td></tr></tbody></table></center>'


    html = table

    return html
}

module.exports = getPdf