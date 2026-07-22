function PricePanel({
  car,
}:{
  car:Masina
}){


const nume = `${car.marca} ${car.model}`;


const trackContact = (type:string)=>{

if(
typeof window !== "undefined" &&
(window as any).fbq
){

(window as any).fbq(
"track",
"Contact",
{
content_name:nume,
value:car.pret || 0,
currency:"EUR",
contact_type:type
}
);

}

};



return (

<div className="
rounded-2xl
border
border-black/10
bg-white
p-6
shadow-[0_8px_30px_rgba(0,0,0,0.06)]
">


<p className="
font-[family-name:var(--font-outfit)]
text-xs
uppercase
text-[#6B6B6B]
">
Preț
</p>



<p className="
mt-1
font-[family-name:var(--font-syne)]
text-4xl
font-bold
text-[#C8102E]
">

{car.pret
?
formatPrice(car.pret,{spaced:true})
:"-"
}

</p>



<p className="
mt-3
text-sm
text-[#6B6B6B]
">

Finanțare disponibilă

</p>



<div className="
mt-5
space-y-3
">


<a

href={whatsappCarLink(car as any)}

target="_blank"

rel="noopener noreferrer"

onClick={()=>trackContact("WhatsApp")}

className="
flex
w-full
items-center
justify-center
gap-2
rounded-full
bg-[#C8102E]
py-3.5
font-semibold
text-white
hover:bg-[#A50E26]
"

>

<Phone size={18}/>

Cere detalii pe WhatsApp

</a>




<a

href={`tel:${SITE.phoneRaw}`}

onClick={()=>trackContact("Telefon")}

className="
flex
w-full
items-center
justify-center
gap-2
rounded-full
border-2
border-[#111]
py-3.5
font-semibold
"

>

<Phone size={18}/>

Sună acum

</a>




<Link

href="/#rate"

className="
flex
w-full
items-center
justify-center
gap-2
rounded-full
bg-[#F2F2F7]
py-3.5
font-semibold
"

>

Calculează rata

<ArrowUpRight size={18}/>

</Link>




<a

href={`mailto:${SITE.email}?subject=Interesat de ${encodeURIComponent(nume)}`}

className="
flex
justify-center
gap-2
py-2
text-sm
text-[#6B6B6B]
"

>

<Mail size={18}/>

Trimite email

</a>


</div>


</div>


)

}




export default function CarDetailView({

car,

similarCars=[]

}:{

car:Masina;

similarCars?:Masina[];

}){


const [activeImage,setActiveImage]=useState(0);



const images =
car.galerie || [];



const specs =
buildSpecs(car);



const title =
`${car.marca || ""} ${car.model || ""}`;



useEffect(()=>{


if(
typeof window !== "undefined" &&
(window as any).fbq
){

(window as any).fbq(
"track",
"ViewContent",
{

content_ids:[
car.slug || car._id
],

value:
car.pret || 0,

currency:"EUR"

}

)

}


},[car]);



const trackMobileWhatsapp=()=>{

if(
typeof window !== "undefined" &&
(window as any).fbq
){

(window as any).fbq(
"track",
"Contact",
{
contact_type:"WhatsApp_Mobile"
}
)

}

};



return (

<>
function PricePanel({
  car,
}:{
  car:Masina
}){


const nume = `${car.marca} ${car.model}`;


const trackContact = (type:string)=>{

if(
typeof window !== "undefined" &&
(window as any).fbq
){

(window as any).fbq(
"track",
"Contact",
{
content_name:nume,
value:car.pret || 0,
currency:"EUR",
contact_type:type
}
);

}

};



return (

<div className="
rounded-2xl
border
border-black/10
bg-white
p-6
shadow-[0_8px_30px_rgba(0,0,0,0.06)]
">


<p className="
font-[family-name:var(--font-outfit)]
text-xs
uppercase
text-[#6B6B6B]
">
Preț
</p>



<p className="
mt-1
font-[family-name:var(--font-syne)]
text-4xl
font-bold
text-[#C8102E]
">

{car.pret
?
formatPrice(car.pret,{spaced:true})
:"-"
}

</p>



<p className="
mt-3
text-sm
text-[#6B6B6B]
">

Finanțare disponibilă

</p>



<div className="
mt-5
space-y-3
">


<a

href={whatsappCarLink(car as any)}

target="_blank"

rel="noopener noreferrer"

onClick={()=>trackContact("WhatsApp")}

className="
flex
w-full
items-center
justify-center
gap-2
rounded-full
bg-[#C8102E]
py-3.5
font-semibold
text-white
hover:bg-[#A50E26]
"

>

<Phone size={18}/>

Cere detalii pe WhatsApp

</a>




<a

href={`tel:${SITE.phoneRaw}`}

onClick={()=>trackContact("Telefon")}

className="
flex
w-full
items-center
justify-center
gap-2
rounded-full
border-2
border-[#111]
py-3.5
font-semibold
"

>

<Phone size={18}/>

Sună acum

</a>




<Link

href="/#rate"

className="
flex
w-full
items-center
justify-center
gap-2
rounded-full
bg-[#F2F2F7]
py-3.5
font-semibold
"

>

Calculează rata

<ArrowUpRight size={18}/>

</Link>




<a

href={`mailto:${SITE.email}?subject=Interesat de ${encodeURIComponent(nume)}`}

className="
flex
justify-center
gap-2
py-2
text-sm
text-[#6B6B6B]
"

>

<Mail size={18}/>

Trimite email

</a>


</div>


</div>


)

}




export default function CarDetailView({

car,

similarCars=[]

}:{

car:Masina;

similarCars?:Masina[];

}){


const [activeImage,setActiveImage]=useState(0);



const images =
car.galerie || [];



const specs =
buildSpecs(car);



const title =
`${car.marca || ""} ${car.model || ""}`;



useEffect(()=>{


if(
typeof window !== "undefined" &&
(window as any).fbq
){

(window as any).fbq(
"track",
"ViewContent",
{

content_ids:[
car.slug || car._id
],

value:
car.pret || 0,

currency:"EUR"

}

)

}


},[car]);



const trackMobileWhatsapp=()=>{

if(
typeof window !== "undefined" &&
(window as any).fbq
){

(window as any).fbq(
"track",
"Contact",
{
contact_type:"WhatsApp_Mobile"
}
)

}

};



return (

<>
<div className="
bg-[#F7F7F7]
pb-28
pt-[72px]
lg:pb-16
">


<div className="
mx-auto
max-w-7xl
px-6
md:px-12
lg:px-16
">


<nav className="
mb-6
flex
items-center
gap-2
text-sm
text-[#6B6B6B]
">

<Link href="/">
Acasă
</Link>

<ChevronRight size={16}/>

<Link href="/#stoc">
Stoc
</Link>

<ChevronRight size={16}/>

<span className="font-medium text-black">
{title}
</span>


</nav>



<Link

href="/#stoc"

className="
mb-6
inline-flex
items-center
gap-2
text-sm
text-[#6B6B6B]
"

>

<ArrowLeft size={16}/>

Înapoi la stoc

</Link>




<div className="
grid
gap-8
lg:grid-cols-12
">


<div className="
lg:col-span-7
">


<CarGallery

variant="page"

images={images}

carName={title}

activeIndex={activeImage}

onIndexChange={setActiveImage}

priority

/>


</div>




<div className="
lg:col-span-5
">


<div className="
lg:sticky
lg:top-24
">


<div className="mb-5">


<span

className={cn(

"rounded-full px-3 py-1 text-xs font-semibold",

car.disponibil==="Disponibil"

?
"bg-emerald-50 text-emerald-700"

:

"bg-amber-50 text-amber-700"

)}

>

{statusText(car.disponibil)}

</span>


</div>




<h1 className="
font-[family-name:var(--font-syne)]
text-3xl
font-bold
text-[#111]
lg:text-4xl
">

{title}

</h1>




<p className="
mt-2
text-[#6B6B6B]
">

{car.motor}

</p>



<div className="
mt-6
hidden
lg:block
">

<PricePanel car={car}/>

</div>



</div>


</div>


</div>





<div className="
mt-12
space-y-12
">


<section>

<SectionTitle>
Specificații generale
</SectionTitle>



<div className="
mt-6
grid
grid-cols-1
gap-x-6
sm:grid-cols-2
lg:grid-cols-4
">


{specs.map((item)=>(


<SpecCell

key={item.label}

icon={item.icon}

label={item.label}

value={item.value}

/>


))}


</div>


</section>






{
car.dotari &&
car.dotari.length>0 &&


<section>


<SectionTitle>
Dotări & echipamente
</SectionTitle>



<ul className="
mt-6
grid
gap-3
sm:grid-cols-2
lg:grid-cols-3
">


{
car.dotari.map((item)=>(


<li

key={item}

className="
flex
gap-2
text-[15px]
"

>

<BadgeCheck

className="text-[#C8102E]"

size={20}

/>

{item}


</li>


))

}


</ul>



</section>

}







{
car.evaluareTehnica &&


<section>


<SectionTitle>
Evaluare tehnică & recomandare
</SectionTitle>



<div className="
mt-6
rounded-2xl
bg-white
p-6
leading-7
shadow-sm
">


<p>

{car.evaluareTehnica}

</p>


</div>


</section>


}




{
similarCars.length>0 &&


<section>


<SectionTitle>
Mașini similare
</SectionTitle>



<div className="
mt-8
grid
gap-6
sm:grid-cols-2
lg:grid-cols-3
">


{
similarCars.map((item,index)=>(

<CarCard

key={item._id}

car={item as any}

index={index}

/>


))

}


</div>


</section>


}


</div>


</div>


</div>






{/* MOBILE CONTACT BAR */}


<div className="
fixed
bottom-0
left-0
right-0
z-40
border-t
bg-white/95
px-4
py-3
backdrop-blur
lg:hidden
">


<div className="
flex
items-center
gap-3
">


<div className="flex-1">


<p className="
font-bold
text-xl
text-[#C8102E]
">

{car.pret
?
formatPrice(car.pret,{spaced:true})
:
"-"
}


</p>


</div>




<a

href={whatsappCarLink(car as any)}

target="_blank"

rel="noopener noreferrer"

onClick={trackMobileWhatsapp}

className="
flex
items-center
gap-2
rounded-full
bg-[#C8102E]
px-5
py-3
font-semibold
text-white
"

>

<Phone size={18}/>

WhatsApp


</a>


</div>


</div>



</>

)

}
