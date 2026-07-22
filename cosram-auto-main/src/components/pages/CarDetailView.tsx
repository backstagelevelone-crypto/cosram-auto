"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  CarFront,
  ChevronRight,
  CircleGauge,
  Cog,
  DoorOpen,
  Fuel,
  Mail,
  Phone,
  Palette,
  Settings2,
  ShieldCheck,
  Zap,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { SITE, whatsappCarLink } from "@/lib/constants";
import { formatPrice, formatLocaleNumber } from "@/lib/car-display";

import type { Masina } from "@/types/car";

import CarGallery from "@/components/ui/CarGallery";
import CarCard from "@/components/ui/CarCard";


const iconProps = {
  strokeWidth: 1.75,
  className:"h-[22px] w-[22px] text-[#C8102E]"
} as const;



function SectionTitle({
children
}:{
children:React.ReactNode
}){

return (

<h2
className="
border-b-2
border-black
pb-2
text-sm
font-bold
uppercase
tracking-wide
"
>
{children}
</h2>

)

}




function SpecCell({
icon:Icon,
label,
value
}:{
icon:LucideIcon;
label:string;
value:string;
}){


return (

<div
className="
flex
items-center
gap-3
border-b
border-black/10
py-4
"
>

<div
className="
flex
h-11
w-11
items-center
justify-center
rounded-xl
bg-[#F2F2F7]
"
>

<Icon {...iconProps}/>

</div>


<div>

<p
className="
text-[11px]
uppercase
text-[#6B6B6B]
"
>
{label}
</p>


<p
className="
font-semibold
text-[#111]
"
>
{value}
</p>


</div>


</div>

)

}





function statusText(
status?:Masina["disponibil"]
){

switch(status){

case "Disponibil":
return "Disponibil";

case "Rezervat":
return "Rezervat";

case "Vandut":
return "Vândut";

default:
return "Disponibil";

}

}




function buildSpecs(
car:Masina
){

const specs = [

{
icon:CarFront,
label:"Marcă / Model",
value:`${car.marca || ""} ${car.model || ""}`
},

{
icon:CalendarDays,
label:"An fabricație",
value:car.an ? String(car.an):""
},

{
icon:CircleGauge,
label:"Kilometraj",
value:car.kilometraj
? `${formatLocaleNumber(car.kilometraj)} km`
:""
},


{
icon:Fuel,
label:"Combustibil",
value:car.combustibil || ""
},


{
icon:Settings2,
label:"Cutie viteze",
value:car.cutieViteze || ""
},


{
icon:Cog,
label:"Motor",
value:car.motor || ""
},


{
icon:Zap,
label:"Putere",
value:car.putere
? `${car.putere} CP`
:""
},


{
icon:CarFront,
label:"Caroserie",
value:car.caroserie || ""
},


{
icon:Palette,
label:"Culoare",
value:car.culoare || ""
},


{
icon:DoorOpen,
label:"Nr. uși",
value:car.nrUsi
? String(car.nrUsi)
:""
},


{
icon:CarFront,
label:"Tracțiune",
value:car.tractiune || ""
},


{
icon:ShieldCheck,
label:"Inspecție tehnică",
value:car.inspectieTehnica || ""
}


];


return specs.filter(x=>x.value);

}






function PricePanel({
car
}:{
car:Masina
}){


const nume =
`${car.marca} ${car.model}`;


const trackContact=(type:string)=>{

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

<div
className="
rounded-2xl
border
border-black/10
bg-white
p-6
shadow-sm
"
>


<p
className="
text-xs
uppercase
text-[#6B6B6B]
"
>
Preț
</p>


<p
className="
mt-1
text-4xl
font-bold
text-[#C8102E]
"
>

{
car.pret
?
formatPrice(car.pret,{spaced:true})
:"-"
}

</p>



<p
className="
mt-3
text-sm
text-[#6B6B6B]
"
>

Finanțare disponibilă

</p>


<div
className="
mt-5
space-y-3
"
>


<a
href={whatsappCarLink(car as any)}
target="_blank"
rel="noopener noreferrer"
onClick={()=>trackContact("WhatsApp")}
className="
flex
justify-center
gap-2
rounded-full
bg-[#C8102E]
py-3
font-semibold
text-white
"
>

<Phone size={18}/>

Cere detalii WhatsApp

</a>


<a
href={`tel:${SITE.phoneRaw}`}
className="
flex
justify-center
gap-2
rounded-full
border-2
border-black
py-3
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
justify-center
gap-2
rounded-full
bg-[#F2F2F7]
py-3
font-semibold
"
>

Calculează rata

<ArrowUpRight size={18}/>

</Link>
      </div>

    </div>

  )

}
export default function CarDetailView({

car,

similarCars = []

}:{

car:Masina;

similarCars?:Masina[];

}){


const [activeImage,setActiveImage] = useState(0);


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

content_type:"product",

value:
car.pret || 0,

currency:"EUR"

}

);

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

content_name:title,

contact_type:"WhatsApp_Mobile"

}

);


}


};




return (

<>


<div
className="
bg-[#F7F7F7]
pb-28
pt-[72px]
lg:pb-16
"
>


<div
className="
mx-auto
max-w-7xl
px-6
md:px-12
lg:px-16
"
>



<nav
className="
mb-6
flex
items-center
gap-2
text-sm
text-[#6B6B6B]
"
>


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





<div
className="
grid
gap-8
lg:grid-cols-12
"
>



<div
className="
lg:col-span-7
"
>


<CarGallery

variant="page"

images={images}

carName={title}

activeIndex={activeImage}

onIndexChange={setActiveImage}

priority

/>


</div>





<div
className="
lg:col-span-5
"
>


<div
className="
lg:sticky
lg:top-24
"
>



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




<h1

className="
text-3xl
font-bold
text-[#111]
lg:text-4xl
"

>

{title}

</h1>




<p
className="
mt-2
text-[#6B6B6B]
"
>

{car.motor}

</p>





<div
className="
mt-6
hidden
lg:block
"
>


<PricePanel car={car}/>


</div>



</div>


</div>


</div>






<div
className="
mt-12
space-y-12
"
>


<section>


<SectionTitle>

Specificații generale

</SectionTitle>



<div
className="
mt-6
grid
grid-cols-1
gap-x-6
sm:grid-cols-2
lg:grid-cols-4
"
>


{

specs.map(item=>(


<SpecCell

key={item.label}

icon={item.icon}

label={item.label}

value={item.value}

/>


))

}


</div>



</section>

      {car.dotari && car.dotari.length > 0 && (

        <section>

          <SectionTitle>
            Dotări & echipamente
          </SectionTitle>


          <ul
            className="
            mt-6
            grid
            gap-3
            sm:grid-cols-2
            lg:grid-cols-3
            "
          >

            {car.dotari.map((item)=>(

              <li
                key={item}
                className="
                flex
                items-start
                gap-2
                text-[15px]
                text-[#111]
                "
              >

                <BadgeCheck
                  size={20}
                  className="shrink-0 text-[#C8102E]"
                />

                {item}

              </li>

            ))}


          </ul>


        </section>

      )}






      {car.evaluareTehnica && (

        <section>


          <SectionTitle>
            Evaluare tehnică & recomandare
          </SectionTitle>



          <div
            className="
            mt-6
            rounded-2xl
            bg-white
            p-6
            text-[#2A2A2A]
            leading-7
            shadow-sm
            "
          >

            {car.evaluareTehnica}


          </div>



        </section>

      )}






      {similarCars.length > 0 && (

        <section
          className="
          border-t
          border-black/10
          pt-12
          "
        >


          <SectionTitle>
            Mașini similare
          </SectionTitle>



          <div
            className="
            mt-8
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            "
          >


            {similarCars.map((item,index)=>(


              <CarCard

                key={item._id}

                car={item as any}

                index={index}

              />


            ))}



          </div>


        </section>


      )}



    </div>


  </div>


</div>






{/* MOBILE CONTACT BAR */}


<div
className="
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
"
>


<div
className="
flex
items-center
gap-3
"
>


<div
className="
flex-1
"
>


<p
className="
text-xl
font-bold
text-[#C8102E]
"
>

{
car.pret
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
