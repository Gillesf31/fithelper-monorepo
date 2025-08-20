import {
  calculateCalories,
  UserInfo,
} from '@fithelper-monorepo/intake-data-access';
import { RadioOption } from '@fithelper-monorepo/shared-ui-components-radio-option-ui';
import { Title } from '@fithelper-monorepo/shared-ui-components-title-ui';
import { useState } from 'react';

export function IntakeFeature() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    gender: 'male',
    measurementSystem: 'metric',
    age: '',
    weight: '',
    height: '',
    activityFactor: 1.2,
    caloriesAdjustment: 250,
  });

  const [showModal, setShowModal] = useState(false);

  const updateGender = (gender: 'male' | 'female') => {
    setUserInfo((prev: UserInfo) => ({ ...prev, gender }));
  };

  // NOTE: Will be implemented in the future
  // const updateSystem = () => {
  //   setUserInfo((prev: UserInfo) => ({
  //     ...prev,
  //     measurementSystem:
  //       prev.measurementSystem === 'metric' ? 'imperial' : 'metric',
  //   }));
  // };

  const updateAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget?.value || '';
    setUserInfo((prev: UserInfo) => ({ ...prev, age: value }));
  };

  const updateWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget?.value || '';
    setUserInfo((prev: UserInfo) => ({ ...prev, weight: value }));
  };

  const updateHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget?.value || '';
    setUserInfo((prev: UserInfo) => ({ ...prev, height: value }));
  };

  const updateActivityFactor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget?.value || '1.2';
    setUserInfo((prev: UserInfo) => ({
      ...prev,
      activityFactor: parseFloat(value),
    }));
  };

  const updateCaloriesAdjustment = (value: number) => {
    setUserInfo((prev: UserInfo) => ({ ...prev, caloriesAdjustment: value }));
  };

  const { bmr, muscleGains, loseFat } = calculateCalories(userInfo);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <section className="indicator w-full max-w-md flex flex-col p-4 card bg-base-300 shadow-xl">
        <span className="indicator-item badge badge-primary">new</span>
        <Title>Intake calculator</Title>
        <p className="text-xl font-semibold">Gender</p>
        <div className="form-control">
          <RadioOption<'male' | 'female'>
            label="Male"
            value="male"
            checked={userInfo.gender === 'male'}
            onChange={updateGender}
            name="gender"
          />
        </div>
        <div className="form-control">
          <RadioOption<'male' | 'female'>
            label="Female"
            value="female"
            checked={userInfo.gender === 'female'}
            onChange={updateGender}
            name="gender"
            className="radio checked:bg-pink-500"
          />
        </div>
        {/* NOTE: Will be implemented in the future */}
        {/* <label className="swap place-content-start text-xl font-semibold my-3">
          <input onChange={updateSystem} type="checkbox" />
          {userInfo.measurementSystem === 'metric' ? (
            <>
              <div className="swap-on">Imperial</div>
              <div className="swap-off">Metric</div>
            </>
          ) : (
            <>
              <div className="swap-off">Metric</div>
              <div className="swap-on">Imperial</div>
            </>
          )}
        </label> */}
        <label className="input input-bordered flex items-center mb-3 gap-2">
          Age
          <input
            onChange={updateAge}
            className="grow bg-transparent placeholder:opacity-25"
            max="99"
            min="13"
            name="age"
            value={userInfo.age}
            placeholder="69 years old"
            required
            type="number"
          />
        </label>
        <label className="input input-bordered flex items-center mb-3 gap-2">
          Weight
          <input
            onChange={updateWeight}
            className="grow bg-transparent placeholder:opacity-25"
            max="400"
            min="0"
            name="weight"
            value={userInfo.weight}
            placeholder="80 kg"
            required
            type="number"
          />
        </label>
        <label className="input input-bordered flex items-center mb-3 gap-2">
          Height
          <input
            onChange={updateHeight}
            className="grow bg-transparent placeholder:opacity-25"
            max="300"
            min="0"
            name="height"
            value={userInfo.height}
            placeholder="183 cm"
            required
            type="number"
          />
        </label>
        <div className="flex flex-row">
          <div className="tooltip">
            <svg
              className="w-6 h-6 self-center hover:cursor-pointer"
              fill="currentColor"
              onClick={() => setShowModal(true)}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                fillRule="evenodd"
              />
            </svg>
            {showModal && (
              <dialog className="modal" open>
                <div className="modal-box">
                  <div>Activity Factor Information</div>
                </div>
                <form className="modal-backdrop" method="dialog">
                  <button
                    className="btn btn-ghost"
                    onClick={() => setShowModal(false)}
                  >
                    close
                  </button>
                </form>
              </dialog>
            )}
          </div>
          <div className="flex flex-col flex-grow pl-2">
            <input
              onChange={updateActivityFactor}
              value={userInfo.activityFactor}
              className="range range-primary"
              max="1.9"
              min="1"
              name="activityFactor"
              step="0.1"
              type="range"
            />
            <div className="w-full flex justify-between text-xs pr-2 pl-[1.05rem] [&_span]:text-sm">
              <span>1</span>
              <span>1.1</span>
              <span>1.2</span>
              <span>1.3</span>
              <span>1.4</span>
              <span>1.5</span>
              <span>1.6</span>
              <span>1.7</span>
              <span>1.8</span>
              <span>1.9</span>
            </div>
          </div>
        </div>
        <div className="form-control mt-5">
          <p className="text-xl font-semibold">Base Calories Adjustment</p>
          <RadioOption<string>
            label="+/- 250 kcal (Recommended)"
            value="250"
            checked={userInfo.caloriesAdjustment === 250}
            onChange={(value) => updateCaloriesAdjustment(Number(value))}
            name="caloriesAdjustment"
            className="radio checked:bg-green-500"
          />
        </div>
        <div className="form-control">
          <RadioOption<string>
            label="+/- 500 kcal"
            value="500"
            checked={userInfo.caloriesAdjustment === 500}
            onChange={(value) => updateCaloriesAdjustment(Number(value))}
            name="caloriesAdjustment"
            className="radio checked:bg-orange-500"
          />
        </div>
        <div className="form-control">
          <RadioOption<string>
            label="+/- 750 kcal"
            value="750"
            checked={userInfo.caloriesAdjustment === 750}
            onChange={(value) => updateCaloriesAdjustment(Number(value))}
            name="caloriesAdjustment"
            className="radio checked:bg-red-500"
          />
        </div>

        {bmr !== 0 ? (
          <div className="my-3">
            <p className="text-lg">
              Your maintenance calorie intake is {bmr} calories per day
            </p>
            <p className="text-lg">
              To gain muscle, consume {muscleGains} calories per day
            </p>
            <p className="text-lg">
              To lose fat, consume {loseFat} calories per day
            </p>
          </div>
        ) : (
          <p className="my-3 text-lg">
            <span role="img" aria-label="Warning">
              ⚠️
            </span>{' '}
            Please fill out the form to calculate your calorie needs
          </p>
        )}
      </section>
    </div>
  );
}

export default IntakeFeature;
