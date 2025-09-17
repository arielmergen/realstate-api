import { SliderInput, Slider, UpdateSliderInput } from '../../entities';
import { SliderService } from './slider.service';
export declare class SliderResolver {
    private readonly sliderService;
    constructor(sliderService: SliderService);
    create(createSliderInput: SliderInput): Promise<Slider>;
    findAll(): Promise<Slider[]>;
    findOne(id: string): Promise<Slider | null>;
    update(id: string, updateSliderInput: UpdateSliderInput): Promise<Slider>;
    delete(id: string): Promise<Slider>;
}
