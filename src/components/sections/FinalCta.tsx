import { appUrl, ctaLabel } from '../../content/site';
import { asset } from '../../lib/asset';

const title = {
	wide: ['Профессиональные материалы в фирменном стиле', 'за минуты, а не дни'],
	narrow: 'Профессиональные материалы в фирменном стиле за минуты, а не дни',
};

/**
 * Финальный экран: та же градиентная карточка, что и в hero, плюс три слоя
 * декоративной пыли — по одному на каждый макет, они складываются с фоном
 * режимом plus-lighter.
 *
 * Поле сверху на мобильном вдвое меньше нижнего: базовые 64 пикселя макета
 * перебиты у оригинала отдельным правилом на #cta до 32.
 */
export function FinalCta() {
	return (
		<section
			id='cta'
			className='relative flex flex-col items-center justify-center overflow-hidden rounded-[calc(32*var(--u))] bg-white bg-[linear-gradient(157deg,#ffffff_11%,#ffcdb3_33%,#ffa4b6_53%,#ffb2e9_67%,#d4d6ff_90%,#d4d6ff_97%,#ffffff_100%)] px-32 pt-32 pb-64 md:px-0 md:py-72 lg:py-[128px]'
		>
			<div
				aria-hidden
				className='pointer-events-none absolute inset-0 overflow-hidden rounded-[calc(15*var(--u))] opacity-20 mix-blend-plus-lighter'
			>
				<img
					src={asset('cta-dust-desktop.webp')}
					alt=''
					className='absolute inset-0 hidden h-full w-full object-cover lg:block'
				/>
				<img
					src={asset('cta-dust-tablet.webp')}
					alt=''
					className='absolute inset-0 hidden h-full w-full object-cover md:block lg:hidden'
				/>
				<img
					src={asset('cta-dust-mobile.webp')}
					alt=''
					className='absolute top-26 -left-8 h-388 w-388 object-cover md:hidden'
				/>
			</div>

			<div className='relative z-1 flex w-full flex-col items-center gap-24 px-16 md:max-w-658 md:gap-32 md:px-0 lg:max-w-898'>
				<div className='flex flex-col items-center gap-12 md:gap-16'>
					{/*
						Кегль здесь не через text-u-*: на десктопе размер фиксированный,
						а своя утилита в каскаде стоит после базовой и перебивала бы её
						независимо от брейкпоинта.
					*/}
					{/*
						Кегль снят не с .dds-launch-title, а с сохранённых стилей CMS —
						они специфичнее и задают другие числа: 24 пикселя макета на
						мобильном и 36 от макета 768 на планшете. На десктопе размер
						перебивает уже правило по id и ставит фиксированные 48px.
					*/}
					<h2 className='text-center text-[calc(24*var(--u))] leading-[calc(40/32)] font-medium tracking-[calc(-1.25*var(--u))] md:text-[calc(36/7.68*1vw)] md:leading-[calc(64/52)] lg:text-[48px]'>
						<span className='lg:hidden'>{title.narrow}</span>
						<span className='hidden lg:inline'>
							{title.wide[0]}
							<br />
							{title.wide[1]}
						</span>
					</h2>
				</div>

				<a
					href={appUrl}
					className='text-u-12 group inline-flex items-center justify-center rounded-[12px] bg-white px-16 py-12 leading-[calc(16/12)] font-semibold transition-[background-color,scale] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.975] md:px-20 md:py-14 md:text-u-14 md:leading-[calc(20/14)]'
				>
					<span className='bg-[image:var(--btn-shine),var(--brand-gradient)] bg-[length:400%_100%,100%_100%] bg-[position:100%_50%,0%_50%] bg-no-repeat bg-clip-text text-transparent group-hover:animate-btn-shine group-focus-visible:animate-btn-shine motion-reduce:animate-none'>
						{ctaLabel}
					</span>
				</a>
			</div>
		</section>
	);
}
